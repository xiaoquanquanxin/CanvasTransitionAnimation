//  马赛克效果 - 分10份
function getMosaicArr(config) {
	//  图片信息的副本
	const data = [...config.imageInfo.data];
	const {part, containerFlat} = config;
	// console.log('part', part);
	//  有 sh 组行
	const sh = config.height / part;
	//  有 sh 组列
	const sw = config.width / part;
	const mosaicArr = [];
	//  创造容器
	for (let i = 0; i < sh; i++) {
		const list = [];
		for (let j = 0; j < sw; j++) {
			const item = {
				data: [],
				opacity: 0,
			};
			containerFlat.push(item);
			list.push(item);
		}
		mosaicArr.push(list);
	}
	//  剥离数据
	for (let i = 0; i < sh; i++) {
		let _part = part;
		while (_part) {
			for (let j = 0; j < sw; j++) {
				mosaicArr[i][j].data.push(...data.splice(0, part * 4));
			}
			_part--;
		}
	}
	config.mosaicArr = mosaicArr;
	console.log('分成10份以后', config.mosaicArr);
}

//  随机数
function getRandom(min, max) {
	return (Math.random() * (max - min + 1)) + min | 0;
}

//  马赛克效果 - 渲染
function drawMosaic(config, ctx) {
	if (config.cutProgress > 0) {
		config.cutProgress--;
	}
	//  一层图片的高度
	const {part, mosaicArr, containerFlat} = config;
	if (containerFlat.length) {
		const index = getRandom(0, containerFlat.length - 1);
		containerFlat[index].opacity += 255;
		containerFlat.splice(index, 1);
	}

	for (let i = 0; i < mosaicArr.length; i++) {
		for (let j = 0; j < mosaicArr[i].length; j++) {
			const mosaicItem = mosaicArr[i][j];
			const {opacity, data} = mosaicItem;
			const _imageData = new ImageData(new Uint8ClampedArray(data.map((item, index) => {
				//  1、2、3
				if ((index + 1) % 4) {
					return item;
				}
				return opacity;
			})), part, part);
			ctx.putImageData(_imageData, j * part, i * part,);
		}
	}
}


