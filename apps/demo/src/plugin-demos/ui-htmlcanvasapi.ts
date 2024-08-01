import { Canvas } from '@nativescript-community/ui-canvas';
import { HTMLCanvasView } from '@nativescript-community/ui-htmlcanvasapi';
import { EventData, Page, View } from '@nativescript/core';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
}

export function onDraw(args: { object: HTMLCanvasView; canvas: Canvas }) {
	const ctx = args.object.getContext('2d');

	ctx.save();

	ctx.fillStyle = 'yellow';
	ctx.fillRect(10, 10, 200, 100);

	ctx.transform(1, 0.5, -0.5, 1, 30, 10);

	ctx.fillStyle = 'red';
	ctx.fillRect(10, 10, 200, 100);

	ctx.transform(1, 0.5, -0.5, 1, 30, 10);

	ctx.fillStyle = 'blue';
	ctx.fillRect(10, 10, 200, 100);

	ctx.restore();

	ctx.save();

	// Set type of compositing
	ctx.globalCompositeOperation = 'lighten';

	// Draw two overlapping rectangles
	ctx.fillStyle = 'blue';
	ctx.fillRect(260, 10, 100, 100);
	ctx.fillStyle = 'red';
	ctx.fillRect(290, 40, 100, 100);

	ctx.restore();

	ctx.save();

	// Shadow
	ctx.shadowColor = 'lightblue';
	ctx.shadowBlur = 4;
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;

	ctx.font = '50px Arial';

	// Filled text
	ctx.fillStyle = 'purple';
	ctx.fillText('Hello World', 10, 400);

	// Stroked text
	ctx.strokeStyle = 'purple';
	ctx.letterSpacing = '10px';
	ctx.strokeText('Hello World', 10, 460);

	ctx.restore();

	ctx.save();
	ctx.globalCompositeOperation = 'xor';

	ctx.fillStyle = 'blue';
	ctx.fillRect(20, 510, 100, 100);

	ctx.fillStyle = 'red';
	ctx.fillRect(60, 550, 100, 100);
	ctx.restore();

	ctx.save();
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.roundRect(200, 530, 150, 100, [40]);
	ctx.stroke();
	ctx.restore();
}
