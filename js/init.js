//  初始化
function initFn() {
	const config = {
		width: 200,
		height: 100,
		//  原始数据，这个是图片的原始数据，不要动
		imageInfo: null,
		//  存数据，我要把图片上下切10组，我做交错转入的效果
		staggerArr: [],
		//  交错转入，上下分10份
		part: 10,
		//  一层图片的高度
		heightOfOneLayerOfPictures: 100 / 10,
		//  切入时长，这里用需要的帧数做，这里是3秒
		cutProgress: 60 * 3,
		//  切入时长，用于保存这个数据
		cutProgressOrigin: 60 * 3,

		//  马赛克数量
		mosaicNum: 200 * 100 / 10 / 10,
		//  马赛克，这里分成 200 * 100 / 10/10 = 200 个块，10像素一个，简单点
		mosaicArr: [],
		//  容器数据，set是为了把数据碾平
		containerFlat: []
	};
	//  画布
	const $canvas = document.getElementById('canvas');
	const ctx = $canvas.getContext('2d');
	$canvas.width = config.width;
	$canvas.height = config.height;

	const img = new Image();
	img.src = './img/1kb.jpg';
	return {
		ctx,
		config,
		img
	};
}

