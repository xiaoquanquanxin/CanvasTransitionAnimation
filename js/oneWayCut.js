//  左右交错效果 - 分10份
function getStaggerArr(config) {
	const {staggerArr, width, height} = config;
	//  每一组图片的像素数据
	staggerArr.push(
		new ImageData(new Uint8ClampedArray(
			//  图片信息的副本
			config.imageInfo.data
		), width, height)
	);
}


//  左右交错效果 - 渲染
function drawCrossCut(config, ctx, turn) {
	if (config.cutProgress > 0) {
		config.cutProgress--;
	}
	//  一层图片的高度
	const {height, width, cutProgress, cutProgressOrigin, staggerArr} = config;
	//  位移
	const _x = cutProgress / cutProgressOrigin * width;
	let x = 0;
	//  位移
	const _y = cutProgress / cutProgressOrigin * height;
	let y = 0;
	switch (turn) {
		//  从右到左
		case 0:
			x = _x;
			break;
		//  从左到右
		case 1:
			x = -_x;
			break;
		//  从上到下
		case 2:
			y = _y;
			break;
		//  从下到上
		case 3:
			y = -_y;
			break;
	}
	// console.log(staggerArr[0]);
	// console.log(cutProgress);
	ctx.putImageData(staggerArr[0], x, y,);
}


