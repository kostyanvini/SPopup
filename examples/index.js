const btn = document.getElementById('test');

btn.addEventListener('click', function () {
	let t = SPopup.open({
		src: '#test-content'
	});
	console.log(t);
});