

mupdf.oninit = function () {
}

const fileListElem = document.getElementById('fileList');

async function removeProtections(files) { 
    const elemArr = [];
    for (let i=0;i<files.length;i++){
        const li = document.createElement("li");
        li.innerHTML = files[i].name;
        li.setAttribute("class", "list-group-item");
        elemArr.push(li);
        fileListElem?.appendChild(li);
	}

	for (let i=0;i<files.length;i++){
		const fileIArray = await files[i].arrayBuffer();
		const r = new Uint8Array(fileIArray); 
        try {
            let content = await mupdf.cleanFile(r);
            let b2 = new Blob([content], { type: 'application/octet-stream' });
            elemArr[i].setAttribute("class", "list-group-item list-group-item-success");
            saveAs(b2, files[i].name)    
        } catch(error) {
            elemArr[i].setAttribute("class", "list-group-item list-group-item-danger");
        }
	}
} 

document.getElementById('openFileInput').addEventListener('change', (event) => removeProtections(event.target.files));