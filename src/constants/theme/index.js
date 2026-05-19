export * from "./colors";
export * from "./sizes";
export * from "./typography";


/*
Index.js es un archivo barril su unico trabajo es reunir exports de varuios achivos en uno solo
Eso de arrriba significa "todo lo que exporta colors.js, exportalo tambien desde aca" 
esto: NO crea nuevos exports, No duplica solo reenvia

🧠 Traducción mental

Esto:
export * from "./colors";

equivale a decir:
// index.js también exporta colors
export { colors } from "./colors";

ahora por que al momento de importalos no se nombra a index?
Porque JavaScript hace esto automáticamente:
Cuando escribes:
    import { colors } from "../../theme";

JS busca en orden:
    theme.js
    theme.json
    theme/index.js   ✅ encontrado

👉 index.js es el archivo por defecto de una carpeta.

Igual que:
    website.com/

carga:
    website.com/index.html
*/