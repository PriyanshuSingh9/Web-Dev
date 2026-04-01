const fs = require('node:fs/promises');

async function clean() {

    // using {withFileTypes: true} gives us an array of dirent objects with important functions
    let folder = await fs.readdir('clutter', { withFileTypes: true })
    // console.log(folder)

    for (const file of folder) {
        // if directory is detected no need to perform an action on it
        if (file.isDirectory()) {
            continue
        }
        const name = file.name;
        if (!name.includes('.')) continue;

        // const ext = file.split(".").at(-1)
        const ext = name.split(".").at(-1)
        console.log(ext)
        try {
            // create folder for each extension type
            await fs.mkdir(`clutter/${ext}`, { recursive: true })
            // move files into respective directories
            await fs.rename(`clutter/${name}`, `clutter/${ext}/${name}`)
        }
        catch (err) {
            console.error('Error handling', file, err);
        }
    }
}

clean()