var client = new WebTorrent();
var infoHash = document.getElementById('infoHash');
var btn = document.getElementById('download');
var p = document.getElementById('log');
var links = document.getElementById('links');
var downSpeed = document.getElementById('downSpeed');
var seedFile = document.getElementById('file');
var seedfolder = document.getElementById('folder');
let tor;

if(window.location.hash.substring(1)!== ""){
	log("Downloading.......")
	download(window.location.hash.substring(1))
}

function download(hash) {
	var data = "magnet:?xt=urn:btih:" + hash + "&dn=name.txt&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969"
	console.log(data)
	client.add(data, onTorrent);
}

function onTorrent(torrent){
	log("hash = " + torrent.infoHash)
	tor = torrent;
	console.log(torrent)
	torrent.files.forEach((file) => {
		file.appendTo('.file');
	})

	torrent.on('done',()=>{
		console.log("donw downloading");
		torrent.files.forEach((file) => {
		var a = document.createElement('a');
		var br = document.createElement('br');
		a.download = file.name;
		file.getBlobURL((err,url) => {
			a.href = url;
		});
		a.innerHTML = file.name
		links.appendChild(a);
		links.appendChild(br);
		a.click();
	})
	})

}

function log(str) {
	p.innerHTML += str + '<br><br>';
}

btn.onclick = () => {
	download(infoHash.value);
}

seedFile.addEventListener('change',() =>{
	client.seed(seedFile.files,onTorrent)
})

seedfolder.addEventListener('change', () => {
	client.seed(seedfolder.files, onTorrent)
})
