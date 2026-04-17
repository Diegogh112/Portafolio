document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const fullScreenBtn = document.getElementById('fullscreen-btn');
    const exportExcelBtn = document.getElementById('export-excel-btn');
    const ganttWrapper = document.getElementById('gantt-wrapper');
    const inputTbody = document.getElementById('input-tbody');
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.getElementById('table-wrapper');
    const timelineHeader = document.getElementById('timeline-header');
    const ganttTbody = document.getElementById('gantt-tbody');
    const themeSelector = document.getElementById('theme-selector');

    if (themeSelector) {
        const savedTheme = localStorage.getItem('ganttTheme') || 'light';
        themeSelector.value = savedTheme;
        document.body.setAttribute('data-theme', savedTheme);

        themeSelector.addEventListener('change', (e) => {
            const t = e.target.value;
            document.body.setAttribute('data-theme', t);
            localStorage.setItem('ganttTheme', t);
        });
    }

    const DAY_MS = 24 * 60 * 60 * 1000;

    let chartDeliverablesCache = [];

    function parseDate(dateStr) {
        if (dateStr === undefined || dateStr === null || String(dateStr).trim() === '') return null;
        if (typeof dateStr === 'string') dateStr = dateStr.trim();

        let asNum = Number(dateStr);
        if (!isNaN(asNum) && dateStr !== "") {
            if (asNum < 1000) return new Date(2021, 0, 1); // Autocompletar cuando ponen "1" u otros números pequeños que no son seriales útiles
            const d = new Date(Date.UTC(1899, 11, 30));
            d.setUTCDate(d.getUTCDate() + asNum);
            return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        }

        const parts = String(dateStr).split('/');
        if (parts.length === 3) {
            let d = parseInt(parts[0], 10);
            let m = parseInt(parts[1], 10) - 1;
            let y = parseInt(parts[2], 10);
            if (y < 100) y += 2000;
            const date = new Date(y, m, d, 0, 0, 0); // Strict local midnight
            if (!isNaN(date)) return date;
        }
        return new Date(2021, 0, 1); // Autocompletar basura textual con 1/1/2021
    }

    function parsePercent(val) {
        if (!val) return 0;
        let numStr = val.toString().trim().replace('%', '').replace(',', '.');
        let num = parseFloat(numStr);
        return isNaN(num) ? 0 : Math.max(0, Math.min(100, num));
    }

    function getDaysBetween(d1, d2) {
        if (!d1 || !d2) return 0;
        const u1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
        const u2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
        return Math.round((u2 - u1) / DAY_MS); // Fixed with Math.round to avoid float truncations
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function populateTable(textStr) {
        if (!textStr) return;
        const rows = textStr.split('\n');
        let html = '';
        for (let r of rows) {
            if (!r.trim() && r === rows[rows.length - 1]) continue;
            let cells = r.split('\t');
            while (cells.length < 5) cells.push('');
            html += '<tr>' + cells.slice(0, 5).map(c => `<td contenteditable="true">${c}</td>`).join('') + '<td class="col-delete"><button class="del-row-btn" title="Eliminar fila">✕</button></td></tr>';
        }
        inputTbody.innerHTML = html;
    }

    function ensureEmptyRows() {
        if (inputTbody.children.length === 0) {
            inputTbody.innerHTML = '';
        }
    }

    const hashData = window.location.hash.slice(1);
    let initialData = null;

    if (hashData) {
        try {
            initialData = decodeURIComponent(atob(hashData));
            if (!initialData.includes('\t')) initialData = null; // Basic format verification
        } catch (e) {
            console.error("Link inválido");
        }
    }

    if (!initialData) {
        initialData = localStorage.getItem('ganttVisionData');
    }

    if (initialData) populateTable(initialData);
    ensureEmptyRows();

    document.querySelector('.data-input-table').addEventListener('paste', (e) => {
        let text = (e.clipboardData || window.clipboardData).getData('text');

        // Let's only handle the paste event default-override if it looks like a multi-column or multi-row excel payload.
        // Otherwise it could be a single cell replacement.
        if (text.includes('\t') || text.includes('\n')) {
            e.preventDefault();
            populateTable(text);
        }
    });

    const addRowBtn = document.getElementById('add-row-btn');
    if (addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            inputTbody.insertAdjacentHTML('beforeend', '<tr><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td class="col-delete"><button class="del-row-btn" title="Eliminar fila">✕</button></td></tr>');
        });
    }

    inputTbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('del-row-btn')) {
            e.target.closest('tr').remove();
            if (inputTbody.children.length === 0) ensureEmptyRows();
        }
    });

    generateBtn.addEventListener('click', () => {
        let textArr = [];
        inputTbody.querySelectorAll('tr').forEach(tr => {
            let cells = Array.from(tr.querySelectorAll('td')).map(td => td.innerText || td.textContent);
            if (cells.some(c => c.trim() !== '')) {
                textArr.push(cells.join('\t'));
            }
        });
        const text = textArr.join('\n');

        if (!text.trim()) return;

        const rows = text.split('\n');

        const deliverables = [];
        let currentParent = null;

        let minDate = null;
        let maxDate = null;

        for (let i = 0; i < rows.length; i++) {
            const rawLine = rows[i];
            if (!rawLine.trim()) continue;

            const cols = rawLine.split('\t');
            if (cols.length < 1) continue;

            const name = cols[0].trim();
            if (!name) continue;

            const startStr = cols[1];
            const endStr = cols[2];

            const start = parseDate(startStr);
            const end = parseDate(endStr);
            const planned = parsePercent(cols[3]);
            const actual = parsePercent(cols[4]);

            const nameUpper = name.toUpperCase();
            const isKnownPhase = ['FASE', 'DESARROLLO', 'PRODUCCION', 'PRODUCCI', 'CALIDAD'].some(k => nameUpper.includes(k));
            const isPhase = cols[0].startsWith(' ') || cols[0].startsWith('\xa0') || isKnownPhase;

            // Si es una fase y no tiene fechas útiles, ignorarla. Pero si es entregable, permitirlo aunque venga sin fechas para que recoja sus fases
            if (isPhase && (!start || !end)) continue;

            const safeEnd = (start && end && end < start) ? start : end;

            const itemObj = { name, start, end: safeEnd, planned, actual };

            if (start && (!minDate || start < minDate)) minDate = start;
            if (safeEnd && (!maxDate || safeEnd > maxDate)) maxDate = safeEnd;

            if (isPhase && currentParent) {
                currentParent.phases.push(itemObj);
            } else {
                currentParent = { ...itemObj, phases: [] };
                deliverables.push(currentParent);
            }
        }

        if (deliverables.length === 0) {
            alert("No se detectaron datos válidos. Usa formato: Entregable \\t 01/01/2026 \\t 31/01/2026 \\t 50 \\t 20");
            return;
        }

        // Cache data exactly
        localStorage.setItem('ganttVisionData', text);

        chartDeliverablesCache = deliverables;

        const criticalDatesSet = new Set();
        deliverables.forEach(del => {
            if (del.start && del.end) {
                criticalDatesSet.add(new Date(del.start.getFullYear(), del.start.getMonth(), del.start.getDate(), 0, 0, 0).getTime());
                criticalDatesSet.add(new Date(del.end.getFullYear(), del.end.getMonth(), del.end.getDate(), 0, 0, 0).getTime());
            }
            del.phases.forEach(ph => {
                if (ph.start && ph.end) {
                    criticalDatesSet.add(new Date(ph.start.getFullYear(), ph.start.getMonth(), ph.start.getDate(), 0, 0, 0).getTime());
                    criticalDatesSet.add(new Date(ph.end.getFullYear(), ph.end.getMonth(), ph.end.getDate(), 0, 0, 0).getTime());
                }
            });
        });

        // Asegurar que siempre intentamos poner el min y max como críticos
        if (minDate) criticalDatesSet.add(minDate.getTime());
        if (maxDate) criticalDatesSet.add(maxDate.getTime());

        const criticalDates = Array.from(criticalDatesSet).sort((a, b) => a - b);

        // Gap Compression Calculator
        let intervals = [];
        deliverables.forEach(d => {
            if (d.start && d.end) intervals.push({ s: d.start.getTime(), e: d.end.getTime() });
            d.phases.forEach(p => {
                if (p.start && p.end) intervals.push({ s: p.start.getTime(), e: p.end.getTime() });
            });
        });
        intervals.sort((a, b) => a.s - b.s);

        let activeRanges = [];
        if (intervals.length > 0) {
            let current = { s: intervals[0].s, e: intervals[0].e };
            for (let i = 1; i < intervals.length; i++) {
                if (intervals[i].s <= current.e + (7 * DAY_MS)) {
                    current.e = Math.max(current.e, intervals[i].e);
                } else {
                    activeRanges.push(current);
                    current = { s: intervals[i].s, e: intervals[i].e };
                }
            }
            activeRanges.push(current);
        }

        let gaps = [];
        for (let i = 0; i < activeRanges.length - 1; i++) {
            const gapStart = activeRanges[i].e;
            const gapEnd = activeRanges[i + 1].s;
            const gapDays = Math.round((gapEnd - gapStart) / DAY_MS);
            if (gapDays > 14) {
                gaps.push({ s: gapStart, e: gapEnd, realDays: gapDays, visualDays: 4 });
            }
        }

        const mapVirtualDays = (ts) => {
            let realDaysTotal = (ts - minDate.getTime()) / DAY_MS;
            let totalShift = 0;
            for (const g of gaps) {
                if (ts >= g.e) {
                    // Si la fecha es posterior al gap, restamos todo el exceso del gap
                    totalShift += (g.realDays - g.visualDays);
                } else if (ts > g.s && ts < g.e) {
                    // Si la fecha cae DENTRO del gap, aplicamos una compresión lineal para evitar amontonamientos
                    const daysIntoGap = (ts - g.s) / DAY_MS;
                    const compressionFactor = 1 - (g.visualDays / g.realDays);
                    totalShift += daysIntoGap * compressionFactor;
                    break; // No procesamos más gaps ya que ts está dentro de este
                }
            }
            return Math.max(0, realDaysTotal - totalShift);
        };

        const totalVirtualDays = mapVirtualDays(maxDate.getTime());

        renderGantt(deliverables, minDate, maxDate, criticalDates, null, totalVirtualDays, mapVirtualDays);
    });

    function renderGantt(deliverables, minDate, maxDate, criticalDates, fillerDates, totalVisualDays, mapVirtualDays) {

        emptyState.style.display = 'none';

        const mainLegend = document.getElementById('main-legend');
        if (mainLegend) mainLegend.style.display = 'flex';

        tableWrapper.style.display = 'block';

        // Dynamic exact width compression locking the chart inside horizontal view
        const targetWrapper = document.getElementById('table-wrapper');
        const PADDING_X = 40; // Protect boundaries natively
        const availablePixels = targetWrapper.clientWidth - 100 - (PADDING_X * 2);
        const dynamicDayWidth = Math.max(0.01, availablePixels / Math.max(1, totalVisualDays));
        document.documentElement.style.setProperty('--day-width', `${dynamicDayWidth}px`);

        timelineHeader.style.minWidth = `calc(${PADDING_X * 2}px + var(--day-width) * ${totalVisualDays})`;

        let htmlTimelineHeader = '';
        let acceptedPx = [];
        let acceptedPlacements = [];

        const attemptPlacement = (ts, isCritical = false) => {
            const virtualLeft = mapVirtualDays(ts);
            const absoluteLeftPx = virtualLeft * dynamicDayWidth;

            let conflict = false;
            // Umbral de 70px para permitir más fechas pero sin solapamiento real
            const threshold = 70; 
            for (let px of acceptedPx) {
                if (Math.abs(absoluteLeftPx - px) < threshold) {
                    conflict = true; break;
                }
            }
            if (!conflict) {
                acceptedPx.push(absoluteLeftPx);
                acceptedPlacements.push({ ts, virtualLeft });
                return true;
            }
            return false;
        };

        // 1. Priorizar fechas críticas (inicio/fin)
        criticalDates.forEach(ts => attemptPlacement(ts, true));
        
        // Ordenar las aceptadas para evaluar huecos visuales
        acceptedPlacements.sort((a, b) => a.ts - b.ts);

        // 2. Relleno dinámico e inteligente: se adapta a la escala (años, meses, días)
        const totalDays = Math.round((maxDate - minDate) / DAY_MS);
        let step = 1; // Por defecto 1 día
        
        if (totalDays > 365 * 2) step = 30 * 3; // Si dura más de 2 años, saltos de 3 meses
        else if (totalDays > 365) step = 30;    // Si dura más de 1 año, saltos de 1 mes
        else if (totalDays > 60) step = 15;     // Si dura más de 2 meses, saltos de 15 días
        else if (totalDays > 30) step = 7;      // Si dura más de 1 mes, saltos de 7 días
        else step = 2;                         // Proyectos cortos, saltos de 2 días

        // Generar posibles fechas de relleno
        let curr = new Date(minDate);
        while (curr <= maxDate) {
            attemptPlacement(curr.getTime(), false);
            curr = addDays(curr, step);
        }

        // 3. Relleno de emergencia para huecos visuales residuales (> 120px)
        acceptedPlacements.sort((a, b) => a.ts - b.ts);
        let i = 0;
        while (i < acceptedPlacements.length - 1) {
            const current = acceptedPlacements[i];
            const next = acceptedPlacements[i+1];
            const currentPx = current.virtualLeft * dynamicDayWidth;
            const nextPx = next.virtualLeft * dynamicDayWidth;
            
            if (nextPx - currentPx > 120) {
                const midTs = (current.ts + next.ts) / 2;
                if (attemptPlacement(midTs, false)) {
                    acceptedPlacements.sort((a, b) => a.ts - b.ts);
                    continue; 
                }
            }
            i++;
        }

        acceptedPlacements.sort((a, b) => a.ts - b.ts);

        acceptedPlacements.forEach(item => {
            const d = new Date(item.ts);
            const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            htmlTimelineHeader += `
               <div class="date-marker" style="left: calc(${PADDING_X}px + var(--day-width) * ${item.virtualLeft});">${dateStr}</div>
               <div class="date-line" style="left: calc(${PADDING_X}px + var(--day-width) * ${item.virtualLeft});"></div>
            `;
        });

        timelineHeader.innerHTML = htmlTimelineHeader;

        function drawChartCell(item, type, contextLabel, isPhase, topOffset = null) {
            if (!item.start || !item.end) return '';

            const leftDays = mapVirtualDays(item.start.getTime());
            const endDays = mapVirtualDays(item.end.getTime());
            const durationWidthFixed = Math.max(0.01, endDays - leftDays);

            let styleClass = (type === 'planned' || type === 'phase-box') ? 'planned-style' : 'actual-style';

            let customPhaseBg = '';
            let phaseTitleTag = '';

            let valueDisplay = type === 'planned' ? item.planned : (type === 'actual' ? item.actual : 100);

            let barFillHtml = `<div class="bar-fill" style="width: ${valueDisplay}%">
                       <span class="percent-label" style="position:absolute; left: 6px;">${valueDisplay}%</span>
                   </div>`;

            // Adjustments for non-phases (they keep centering)
            let topStyle = topOffset !== null ? `top: ${topOffset}px; transform: none; margin: 0;` : '';

            if (isPhase && type === 'phase-box') {
                styleClass = ''; 
                let bg = 'var(--phase-planned-bg)';
                const lower = item.name.toLowerCase();
                if (lower.includes('desarrollo')) bg = 'var(--phase-dev-bg)';
                else if (lower.includes('calidad')) bg = 'var(--phase-qa-bg)';
                else if (lower.includes('producc')) bg = 'var(--phase-prod-bg)';
                
                customPhaseBg = `background: ${bg}; border: 1px dashed var(--phase-planned-border); border-radius: 4px 4px 0 0; box-sizing: border-box; display: flex; align-items:center; justify-content:center; height: 22px; position:relative; overflow:hidden;`;
                phaseTitleTag = `<span style="font-size: 0.70rem; color: var(--text-main); font-weight: 700; z-index:5; padding: 0 4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; text-align:center; position:absolute; left:0; pointer-events:none;">${item.name}</span>`;
                barFillHtml = ''; 
            } else if (isPhase && type === 'planned') {
                styleClass = '';
                customPhaseBg = `height: 16px; border: 1px dashed var(--phase-planned-border); border-top: none; box-sizing: border-box; background: var(--border-color); border-radius: 0; position: relative;`;
                
                barFillHtml = `<div class="bar-fill" style="width: ${valueDisplay}%; height: 100%; background: var(--planned-color); border-radius: 0;">
                       <span class="percent-label" style="position:absolute; left: 6px; top: 50%; transform: translateY(-50%); font-size: 0.65rem;">${valueDisplay}% Plan</span>
                   </div>`;
            } else if (isPhase && type === 'actual') {
                styleClass = ''; 
                customPhaseBg = `background: var(--border-color); border: 1px dashed var(--phase-planned-border); border-top: none; box-sizing: border-box; height: 16px; position: relative; border-radius: 0 0 4px 4px; overflow: hidden;`;
                barFillHtml = `<div class="bar-fill" style="width: ${valueDisplay}%; height: 100%; background: var(--phase-actual-fill); border-radius: 0;">
                    <span class="percent-label" style="position:absolute; left: 6px; top: 50%; transform: translateY(-50%); color: #ef4444; font-size: 0.65rem;">${valueDisplay}% Real</span>
                </div>`;
            } else if (!isPhase && type === 'planned') {
                phaseTitleTag = ``; 
            }

            return `
            <div class="chart-cell" title="${item.name} - ${contextLabel}">
               <div class="bar-bg-container ${styleClass}" style="left: calc(${PADDING_X}px + var(--day-width) * ${leftDays}); width: calc(var(--day-width) * ${durationWidthFixed}); ${topStyle} ${customPhaseBg}">
                   ${phaseTitleTag}
                   ${barFillHtml}
               </div>
            </div>
            `;
        }

        let htmlRows = '';

        function drawPhaseBlock(phase) {
            if (!phase.start || !phase.end) return '';
            const leftDays = mapVirtualDays(phase.start.getTime());
            const endDays = mapVirtualDays(phase.end.getTime());
            const durationWidthFixed = Math.max(0.01, endDays - leftDays);

            let bg = 'var(--phase-planned-bg)';
            const lower = phase.name.toLowerCase();
            if (lower.includes('desarrollo')) bg = 'var(--phase-dev-bg)';
            else if (lower.includes('calidad')) bg = 'var(--phase-qa-bg)';
            else if (lower.includes('producc')) bg = 'var(--phase-prod-bg)';

            return `
            <div title="${phase.name}" style="position: absolute; left: calc(${PADDING_X}px + var(--day-width) * ${leftDays}); width: calc(var(--day-width) * ${durationWidthFixed}); top: 50%; transform: translateY(-50%); border: 1px dashed var(--phase-planned-border); border-radius: 4px; display: flex; flex-direction: column; overflow: hidden; background: ${bg};">
                <div style="height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.70rem; color: var(--text-main); font-weight: 700; border-bottom: 1px dashed var(--phase-planned-border); position: relative; z-index: 5;">
                    ${phase.name}
                </div>
                <div style="height: 18px; position: relative; background: var(--border-color); border-bottom: 1px dashed var(--phase-planned-border);">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${phase.planned}%; background: var(--planned-color); opacity: 0.9;"></div>
                    <span style="position: absolute; left: 6px; top: 50%; transform: translateY(-50%); font-size: 0.65rem; color: var(--text-main); font-weight: 700; z-index: 2;">${phase.planned}% Plan</span>
                </div>
                <div style="height: 18px; position: relative; background: var(--border-color);">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: ${phase.actual}%; background: var(--phase-actual-fill); opacity: 0.9;"></div>
                    <span style="position: absolute; left: 6px; top: 50%; transform: translateY(-50%); font-size: 0.65rem; color: #ef4444; font-weight: 700; z-index: 2;">${phase.actual}% Real</span>
                </div>
            </div>
            `;
        }

        deliverables.forEach(deliverable => {
            const hasPhases = deliverable.phases.length > 0;
            const hasParentBars = deliverable.start !== null && deliverable.end !== null;
            
            let rowsForDiv = 0;
            if (hasParentBars) rowsForDiv += 2;
            if (hasPhases) rowsForDiv += deliverable.phases.length;

            if (rowsForDiv === 0) {
                htmlRows += `<tr><td class="col-main" style="border-bottom: 2px solid #94a3b8;">${deliverable.name}</td><td class="col-timeline" style="border-bottom: 2px solid #94a3b8;"></td></tr>`;
                return;
            }

            const delivBottomStyle = (hasPhases || !hasParentBars) ? '' : 'border-bottom: 2px solid #94a3b8;';
            let firstRowRendered = false;

            if (hasParentBars) {
                htmlRows += `
                <tr>
                    <td rowspan="${rowsForDiv}" class="col-main">${deliverable.name}</td>
                    <td class="col-timeline">${drawChartCell(deliverable, 'planned', 'Plan.', false)}</td>
                </tr>
                <tr>
                    <td class="col-timeline" style="${delivBottomStyle}">${drawChartCell(deliverable, 'actual', 'Real', false)}</td>
                </tr>
                `;
                firstRowRendered = true;
            }

            deliverable.phases.forEach((phase, idx) => {
                const isLastPhase = idx === deliverable.phases.length - 1;
                const phaseBottomStyle = isLastPhase ? 'border-bottom: 2px solid #94a3b8;' : 'border-bottom: 1px solid var(--border-color);';

                if (!firstRowRendered) {
                    htmlRows += `
                    <tr>
                        <td rowspan="${rowsForDiv}" class="col-main" style="${phaseBottomStyle}">${deliverable.name}</td>
                        <td class="col-timeline" style="${phaseBottomStyle} height: 70px; padding: 0;">
                            <div style="position: relative; width: 100%; height: 100%;">
                                ${drawPhaseBlock(phase)}
                            </div>
                        </td>
                    </tr>
                    `;
                    firstRowRendered = true;
                } else {
                    htmlRows += `
                    <tr>
                        <td class="col-timeline" style="${phaseBottomStyle} height: 70px; padding: 0;">
                            <div style="position: relative; width: 100%; height: 100%;">
                                ${drawPhaseBlock(phase)}
                            </div>
                        </td>
                    </tr>
                    `;
                }
            });
        });

        ganttTbody.innerHTML = htmlRows;

        if (fullScreenBtn) fullScreenBtn.style.display = 'block';

        const shareLinkBtn = document.getElementById('share-link-btn');
        const exportImgBtn = document.getElementById('export-img-btn');
        if (shareLinkBtn) shareLinkBtn.style.display = 'block';
        if (exportImgBtn) exportImgBtn.style.display = 'block';
    }

    if (fullScreenBtn) {
        fullScreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                ganttWrapper.requestFullscreen().catch(err => console.error(err));
            } else {
                document.exitFullscreen();
            }
        });
    }

    const showToast = (msg) => {
        const t = document.createElement('div');
        t.innerText = msg;
        t.className = 'toast-notification';
        document.body.appendChild(t);
        setTimeout(() => t.classList.add('show'), 10);
        setTimeout(() => {
            t.classList.remove('show');
            setTimeout(() => t.remove(), 300);
        }, 2000);
    };

    const shareLinkBtn = document.getElementById('share-link-btn');
    if (shareLinkBtn) {
        shareLinkBtn.addEventListener('click', () => {
            let textArr = [];
            inputTbody.querySelectorAll('tr').forEach(tr => {
                let cells = Array.from(tr.querySelectorAll('td')).map(td => td.innerText || td.textContent);
                if (cells.some(c => c.trim() !== '')) {
                    textArr.push(cells.slice(0, 5).join('\t'));
                }
            });
            const text = textArr.join('\n');
            if (!text.trim()) return showToast("No hay datos cargados para compartir.");

            const encoded = btoa(encodeURIComponent(text));
            const newUrl = window.location.origin + window.location.pathname + "#" + encoded;

            navigator.clipboard.writeText(newUrl).then(() => {
                showToast("Enlace copiado");
            }).catch(err => {
                prompt("Por favor copia manualmente este enlace:", newUrl);
            });
        });
    }

    const exportImgBtn = document.getElementById('export-img-btn');
    if (exportImgBtn) {
        exportImgBtn.addEventListener('click', () => {
            if (!window.html2canvas) return alert("Cargando motor de renderizado...");

            const targetElement = document.getElementById('gantt-table');
            const wrapper = document.getElementById('table-wrapper');

            const oldScrollLeft = wrapper.scrollLeft;
            const oldScrollTop = wrapper.scrollTop;
            wrapper.scrollLeft = 0;
            wrapper.scrollTop = 0;

            const stickyElements = targetElement.querySelectorAll('.col-main, th');
            stickyElements.forEach(el => {
                el._origPos = el.style.position;
                el.style.setProperty('position', 'relative', 'important');
            });

            html2canvas(targetElement, {
                scale: 3,
                backgroundColor: "#ffffff",
                useCORS: true
            }).then(canvas => {
                stickyElements.forEach(el => {
                    el.style.position = el._origPos || '';
                });
                wrapper.scrollLeft = oldScrollLeft;
                wrapper.scrollTop = oldScrollTop;

                const link = document.createElement('a');
                link.download = 'Avance de Proyecto.png';
                link.href = canvas.toDataURL("image/png");
                link.click();
            }).catch(err => {
                stickyElements.forEach(el => {
                    el.style.position = el._origPos || '';
                });
                console.error(err);
                alert("Ocurrió un error al intentar exportar la imagen.");
            });
        });
    }
});
