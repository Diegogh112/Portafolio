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

    const DAY_MS = 24 * 60 * 60 * 1000;
    
    let chartDeliverablesCache = [];

    function parseDate(dateStr) {
        if (!dateStr || typeof dateStr !== 'string') return null;
        dateStr = dateStr.trim();
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            let d = parseInt(parts[0], 10);
            let m = parseInt(parts[1], 10) - 1;
            let y = parseInt(parts[2], 10);
            if (y < 100) y += 2000;
            const date = new Date(y, m, d, 0, 0, 0); // Strict local midnight
            if (!isNaN(date)) return date;
        }
        return null;
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
        for(let r of rows) {
            if(!r.trim() && r === rows[rows.length-1]) continue;
            let cells = r.split('\t');
            while(cells.length < 5) cells.push('');
            html += '<tr>' + cells.slice(0, 5).map(c => `<td contenteditable="true">${c}</td>`).join('') + '<td class="col-delete"><button class="del-row-btn" title="Eliminar fila">✕</button></td></tr>';
        }
        inputTbody.innerHTML = html;
    }

    function ensureEmptyRows() {
        if (inputTbody.children.length === 0) {
            let html = '';
            for(let i=0; i<15; i++) {
                html += '<tr><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td contenteditable="true"></td><td class="col-delete"><button class="del-row-btn" title="Eliminar fila">✕</button></td></tr>';
            }
            inputTbody.innerHTML = html;
        }
    }

    const hashData = window.location.hash.slice(1);
    let initialData = null;
    
    if (hashData) {
        try {
            initialData = decodeURIComponent(atob(hashData));
            if (!initialData.includes('\t')) initialData = null; // Basic format verification
        } catch(e) {
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
    if(addRowBtn) {
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
            if (cols.length < 5) continue;

            const name = cols[0].trim();
            const startStr = cols[1];
            const endStr = cols[2];
            
            const start = parseDate(startStr);
            const end = parseDate(endStr);
            const planned = parsePercent(cols[3]);
            const actual = parsePercent(cols[4]);

            if (!start || !end) continue;
            
            const safeEnd = end < start ? start : end;

            const nameUpper = name.toUpperCase();
            const isKnownPhase = ['FASE', 'DESARROLLO', 'PRODUCCION', 'PRODUCCI', 'CALIDAD'].some(k => nameUpper.includes(k));
            const isPhase = cols[0].startsWith(' ') || cols[0].startsWith('\xa0') || isKnownPhase;

            const itemObj = { name, start, end: safeEnd, planned, actual };

            if (!minDate || start < minDate) minDate = start;
            if (!maxDate || safeEnd > maxDate) maxDate = safeEnd;
            
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
             criticalDatesSet.add(new Date(del.start.getFullYear(), del.start.getMonth(), del.start.getDate(), 0, 0, 0).getTime());
             criticalDatesSet.add(new Date(del.end.getFullYear(), del.end.getMonth(), del.end.getDate(), 0, 0, 0).getTime());
             del.phases.forEach(ph => {
                 criticalDatesSet.add(new Date(ph.start.getFullYear(), ph.start.getMonth(), ph.start.getDate(), 0, 0, 0).getTime());
                 criticalDatesSet.add(new Date(ph.end.getFullYear(), ph.end.getMonth(), ph.end.getDate(), 0, 0, 0).getTime());
             });
        });
        
        const fillerDatesSet = new Set();
        if (minDate && maxDate) {
            let curr = new Date(minDate);
            while (curr <= maxDate) {
                fillerDatesSet.add(curr.getTime());
                curr = addDays(curr, 15);
            }
            fillerDatesSet.add(maxDate.getTime());
        }

        const criticalDates = Array.from(criticalDatesSet).sort((a, b) => a - b);
        const fillerDates = Array.from(fillerDatesSet).sort((a, b) => a - b);

        // Gap Compression Calculator
        let intervals = [];
        deliverables.forEach(d => {
            intervals.push({s: d.start.getTime(), e: d.end.getTime()});
            d.phases.forEach(p => intervals.push({s: p.start.getTime(), e: p.end.getTime()}));
        });
        intervals.sort((a,b) => a.s - b.s);

        let activeRanges = [];
        if (intervals.length > 0) {
            let current = {s: intervals[0].s, e: intervals[0].e};
            for(let i=1; i<intervals.length; i++) {
                if (intervals[i].s <= current.e + (7 * DAY_MS)) { 
                    current.e = Math.max(current.e, intervals[i].e);
                } else {
                    activeRanges.push(current);
                    current = {s: intervals[i].s, e: intervals[i].e};
                }
            }
            activeRanges.push(current);
        }

        let gaps = [];
        for(let i=0; i<activeRanges.length - 1; i++) {
            const gapStart = activeRanges[i].e;
            const gapEnd = activeRanges[i+1].s;
            const gapDays = Math.round((gapEnd - gapStart) / DAY_MS);
            if (gapDays > 14) { 
                 gaps.push({s: gapStart, e: gapEnd, realDays: gapDays, visualDays: 4}); 
            }
        }

        const mapVirtualDays = (ts) => {
            let realDays = Math.round((ts - minDate.getTime()) / DAY_MS);
            let shift = 0;
            for (const g of gaps) {
                if (ts >= g.e) {
                    shift += (g.realDays - g.visualDays);
                } else if (ts > g.s && ts < g.e) {
                    const daysIntoGap = Math.round((ts - g.s) / DAY_MS);
                    shift += (daysIntoGap - Math.min(daysIntoGap, g.visualDays));
                }
            }
            return Math.max(0, realDays - shift);
        };

        const totalVirtualDays = mapVirtualDays(maxDate.getTime());

        renderGantt(deliverables, minDate, maxDate, criticalDates, fillerDates, totalVirtualDays, mapVirtualDays);
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
        
        const attemptPlacement = (ts) => {
            const virtualLeft = mapVirtualDays(ts);
            const absoluteLeftPx = virtualLeft * dynamicDayWidth;
            
            let conflict = false;
            for(let px of acceptedPx) {
                if(Math.abs(absoluteLeftPx - px) < 65) {
                    conflict = true; break;
                }
            }
            if(!conflict) {
                acceptedPx.push(absoluteLeftPx);
                acceptedPlacements.push({ts, virtualLeft});
            }
        };

        // 1. Prioritize real inputs
        criticalDates.forEach(ts => attemptPlacement(ts));
        // 2. Fill spaces with safe distance from reals
        fillerDates.forEach(ts => attemptPlacement(ts));

        acceptedPlacements.sort((a,b) => a.ts - b.ts);
        
        acceptedPlacements.forEach(item => {
            const d = new Date(item.ts);
            const dateStr = `${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`;
            htmlTimelineHeader += `
               <div class="date-marker" style="left: calc(${PADDING_X}px + var(--day-width) * ${item.virtualLeft});">${dateStr}</div>
               <div class="date-line" style="left: calc(${PADDING_X}px + var(--day-width) * ${item.virtualLeft});"></div>
            `;
        });
        
        timelineHeader.innerHTML = htmlTimelineHeader;

        let htmlRows = '';
        function drawChartCell(item, type, contextLabel, isPhase) {
            const leftDays = mapVirtualDays(item.start.getTime());
            const endDays = mapVirtualDays(item.end.getTime()); 
            // Allow exact decimals and don't force a minimum of 1 day to prevent overscaling on squashed timelines
            const durationWidthFixed = Math.max(0.01, endDays - leftDays);  
            
            const value = type === 'planned' ? item.planned : item.actual;
            const styleClass = type === 'planned' ? 'planned-style' : 'actual-style';
            
            // Adjust margin to protect top titles of phases from overlapping the deliverable above them
            // And give small bottom margin on Actuals to divide the items vertically
            let dynamicMargin = '';
            if (isPhase && type === 'planned') dynamicMargin = 'margin-top: 18px; margin-bottom: 4px;';
            if (type === 'actual') dynamicMargin = 'margin-bottom: 6px;';
            
            const phaseTitleTag = (isPhase && type === 'planned') 
                 ? `<span style="position:absolute; top: -18px; left: 0px; font-size: 0.70rem; color: var(--text-main); white-space:nowrap; font-weight: 600;">${item.name}</span>` 
                 : '';
            
            return `
            <div class="chart-cell" style="${dynamicMargin}" title="${item.name} - ${contextLabel} (${value}%)">
               <div class="bar-bg-container ${styleClass}" style="left: calc(${PADDING_X}px + var(--day-width) * ${leftDays}); width: calc(var(--day-width) * ${durationWidthFixed});">
                   ${phaseTitleTag}
                   <div class="bar-fill" style="width: ${value}%">
                       <span class="percent-label" style="position:absolute; left: 6px;">${value}%</span>
                   </div>
               </div>
            </div>
            `;
        }

        deliverables.forEach(deliverable => {
            const hasPhases = deliverable.phases.length > 0;
            const rowsForDiv = 2 + (deliverable.phases.length * 2);
            
            const delivBottomStyle = hasPhases ? '' : 'border-bottom: 2px solid #94a3b8;';

            htmlRows += `
            <tr>
                <td rowspan="${rowsForDiv}" class="col-main">${deliverable.name}</td>
                <td class="col-timeline">${drawChartCell(deliverable, 'planned', 'Plan.', false)}</td>
            </tr>
            <tr>
                <td class="col-timeline" style="${delivBottomStyle}">${drawChartCell(deliverable, 'actual', 'Real', false)}</td>
            </tr>
            `;

            deliverable.phases.forEach((phase, idx) => {
                const isLastPhase = idx === deliverable.phases.length - 1;
                const phaseBottomStyle = isLastPhase ? 'border-bottom: 2px solid #94a3b8;' : '';
                
                htmlRows += `
                <tr>
                    <td class="col-timeline">${drawChartCell(phase, 'planned', 'Plan.', true)}</td>
                </tr>
                <tr>
                    <td class="col-timeline" style="${phaseBottomStyle}">${drawChartCell(phase, 'actual', 'Real', true)}</td>
                </tr>
                `;
            });
        });

        ganttTbody.innerHTML = htmlRows;
        
        if(fullScreenBtn) fullScreenBtn.style.display = 'block';
        
        const shareLinkBtn = document.getElementById('share-link-btn');
        const exportImgBtn = document.getElementById('export-img-btn');
        if(shareLinkBtn) shareLinkBtn.style.display = 'block';
        if(exportImgBtn) exportImgBtn.style.display = 'block';
    }

    if(fullScreenBtn) {
        fullScreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                ganttWrapper.requestFullscreen().catch(err => console.error(err));
            } else {
                document.exitFullscreen();
            }
        });
    }

    const shareLinkBtn = document.getElementById('share-link-btn');
    if(shareLinkBtn) {
        shareLinkBtn.addEventListener('click', () => {
            let textArr = [];
            inputTbody.querySelectorAll('tr').forEach(tr => {
                let cells = Array.from(tr.querySelectorAll('td')).map(td => td.innerText || td.textContent);
                if (cells.some(c => c.trim() !== '')) {
                    textArr.push(cells.slice(0, 5).join('\t'));
                }
            });
            const text = textArr.join('\n');
            if(!text.trim()) return alert("No hay datos cargados para compartir.");
            
            const encoded = btoa(encodeURIComponent(text));
            const newUrl = window.location.origin + window.location.pathname + "#" + encoded;
            
            navigator.clipboard.writeText(newUrl).then(() => {
                alert("✅ Enlace copiado al portapapeles. Al abrirlo se cargarán tus datos actuales automáticamente.");
            }).catch(err => {
                prompt("Por favor copia manualmente este enlace:", newUrl);
            });
        });
    }

    const exportImgBtn = document.getElementById('export-img-btn');
    if(exportImgBtn) {
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
                link.download = 'Gantt_Alta_Resolucion.png';
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
