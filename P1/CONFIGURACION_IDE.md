# Configuración del IDE para Lombok

Los errores que ves en el IDE son porque **Lombok no está configurado correctamente**. El código está correcto y compilará sin problemas con Maven.

## Solución Rápida

### Para IntelliJ IDEA:

1. **Instalar el plugin de Lombok:**
   - File → Settings → Plugins
   - Buscar "Lombok"
   - Instalar y reiniciar

2. **Habilitar procesamiento de anotaciones:**
   - File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
   - Marcar: ✅ Enable annotation processing
   - Aplicar y reiniciar

3. **Reconstruir el proyecto:**
   - Build → Rebuild Project

### Para Eclipse:

1. **Instalar Lombok:**
   - Descargar `lombok.jar` desde: https://projectlombok.org/download
   - Ejecutar: `java -jar lombok.jar`
   - Seleccionar tu instalación de Eclipse
   - Reiniciar Eclipse

2. **Verificar configuración:**
   - Project → Properties → Java Build Path → Libraries
   - Debe aparecer "lombok.jar"

### Para VS Code:

1. **Instalar extensiones:**
   - "Language Support for Java(TM) by Red Hat"
   - "Extension Pack for Java"

2. **Configurar settings.json:**
   ```json
   {
     "java.configuration.updateBuildConfiguration": "automatic",
     "java.compile.nullAnalysis.mode": "automatic"
   }
   ```

3. **Reconstruir el proyecto:**
   - Ctrl+Shift+P → "Java: Clean Java Language Server Workspace"

## Verificación

Después de configurar, los errores deberían desaparecer. Si persisten:

1. Cierra y reabre el IDE
2. Limpia el caché del proyecto
3. Reconstruye el proyecto

## Compilación con Maven

El código compilará correctamente con Maven incluso si el IDE muestra errores:

```bash
mvn clean compile
```

O desde el IDE con Maven integrado, simplemente ejecuta:
- IntelliJ: Maven → Lifecycle → compile
- Eclipse: Click derecho en proyecto → Run As → Maven build → Goals: `clean compile`

## Nota Importante

Los errores que ves son **solo del IDE**, no del código. Una vez configurado Lombok correctamente, todos los errores desaparecerán porque el IDE podrá "ver" los métodos generados por Lombok (getters, setters, constructores, etc.).

