//  左右交错效果 - 分10份
function getStaggerArr(config) {
	const {staggerArr} = config;
	//  图片信息的副本
	const data = [...config.imageInfo.data];
	//  每一组图片的像素数据
	const partLen = data.length / 10;
	for (let i = 0; i < config.part; i++) {
		staggerArr.push(
			new ImageData(new Uint8ClampedArray(data.splice(0, partLen)), 200, 10)
		);
	}
	console.log('分成10份以后', config.staggerArr);
}


//  左右交错效果 - 渲染
function drawCrossCut(config, ctx, init,) {
	if (config.cutProgress > 0) {
		config.cutProgress--;
	}
	//  一层图片的高度
	const {heightOfOneLayerOfPictures, part, staggerArr, width, cutProgress} = config;
	for (let i = 0; i < part; i += 2) {
		const imageInfo = staggerArr[i + init];
		if (!imageInfo) {
			return;
		}
		let x = 0;
		//  组装canvas
		if (init) {
			//  从右到左
			x = -cutProgress;
		} else {
			//  从左到右
			x = +cutProgress;
		}
		ctx.putImageData(imageInfo, x, (i + init) * heightOfOneLayerOfPictures);
	}
}


