const fs = require("fs");
const exec = require("child_process").exec;
const os = require("os");
let timer;

const isDir = (dir) => {
	try {
		return fs.lstatSync(dir).isDirectory();
	} catch (e ) {
		return false;
	} 
}; 

const removeStatus = () => {
	const el = document.getElementById("status");
	el.classList.remove("clean", "dirty", "unknown");
	return el;
};

const setStatus = (status) => {
	const el = removeStatus();
	el.classList.add(status);
};

const checkGitStatus = ( dir ) => {
	exec("git status", {
		cwd: dir
	}, (err, stdout) => {
		if (err) return setStatus("unknown");
		if(/nothing to commit/.test(stdout)) return setStatus("clean");
		return setStatus("dirty");
	});
};

const formatDir = (dir) => {
	return /^~/.test(dir)
		? os.homedir()+dir.substr(1).trim()
		: dir.trim();
};

document.getElementById("input").addEventListener("keyup", e => {
	removeStatus();
	clearTimeout(timer);
	timer = setTimeout(() => {
		const dir = formatDir(e.target.value);
		if(isDir(dir)){
			checkGitStatus(dir);
		}
	}, 500);
});