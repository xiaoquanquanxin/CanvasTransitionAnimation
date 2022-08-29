//  左右、上下相对（面对面）.mp4
function getStaggerArr(config, isUpDown) {
	const {staggerArr, width, height} = config;
	const {data} = config.imageInfo;
	const originArr = [...data];
	// console.log('originArr', originArr);
	let firstArr = [];
	let lastArr = [];

	let sw = width;
	let sh = height;
	//  上下
	if (isUpDown) {
		sh = height / 2;
		//  每一组图片的像素数据
		//  前一半
		firstArr.push(...originArr.splice(0, originArr.length / 2));
		//  后一半
		lastArr.push(...originArr);
	} else {
		sw = width / 2;
		//  切掉的数量
		const deleteCount = sw * 4;
		//  左右
		while (originArr.length) {
			firstArr.push(...originArr.splice(0, deleteCount));
			lastArr.push(...originArr.splice(0, deleteCount));
		}
	}
	staggerArr.push(new ImageData(new Uint8ClampedArray(firstArr), sw, sh));
	staggerArr.push(new ImageData(new Uint8ClampedArray(lastArr), sw, sh));
}

//  左右、上下相对（面对面）.mp4
function drawCrossCut(config, ctx, isUpDown,) {
	if (config.cutProgress > 0) {
		config.cutProgress--;
	}
	//  一层图片的高度
	const {height, width, cutProgress, cutProgressOrigin, staggerArr} = config;
	// console.log(staggerArr);
	//  位移
	const x = cutProgress / cutProgressOrigin * width / 2;
	let firstX = 0;
	let lastX = 0;
	//  位移
	const y = cutProgress / cutProgressOrigin * height / 2;
	let firstY = 0;
	let lastY = 0;

	//  是上下
	if (isUpDown) {
		//  只处理y
		firstY = -y;
		lastY = height / 2 + y;
	} else {
		//  只处理x
		firstX = -x;
		lastX = width / 2 + x;
	}
	//  上半
	ctx.putImageData(staggerArr[0], firstX, firstY);
	//  下半
	ctx.putImageData(staggerArr[1], lastX, lastY);

}


