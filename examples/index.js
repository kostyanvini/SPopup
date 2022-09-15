const btn = document.getElementById('test');

let t;
btn.addEventListener('click', function () {
	t = SPopup.open({
		src: '#test-content'
	});
});

console.log(t);
