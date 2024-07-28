import { Canvas, CanvasView, createRectF } from '@nativescript-community/ui-canvas';
import { Observable, Style } from '@nativescript/core';
import { CanvasRenderingContext2D } from './contexts/CanvasRenderingContext2D';
import { ImageBitmapRenderingContext } from './contexts/ImageBitmapRenderingContext';
import { CanvasContextType } from '../CanvasTypes';
import { AbstractRenderingContext } from './contexts/AbstractRenderingContext';

class NSHTMLCanvasElement extends Observable {
	private readonly _canvasViewRef: WeakRef<CanvasView>;
	private readonly _contextRef: WeakRef<Canvas>;

	private _offscreenContext: Canvas;
	private _context: CanvasRenderingContext2D | ImageBitmapRenderingContext;

	constructor(canvasView?: CanvasView, canvasContext?: Canvas) {
		super();

		this._canvasViewRef = new WeakRef(canvasView);
		this._contextRef = new WeakRef(canvasContext);
	}

	public getContext(contextId: '2d'): CanvasRenderingContext2D | null;
	public getContext(contextId: 'bitmaprenderer'): ImageBitmapRenderingContext | null;

	public getContext(contextId: CanvasContextType): any {
		let cl: typeof AbstractRenderingContext;

		switch (contextId) {
			case '2d':
				cl = CanvasRenderingContext2D;
				break;
			case 'bitmaprenderer':
				cl = ImageBitmapRenderingContext;
				break;
			default:
				cl = null;
				break;
		}

		if (cl == null) {
			return null;
		}

		if (this._context != null && this._context instanceof cl) {
			return this._context;
		}

		this._context = new cl(this) as any;
		return this._context;
	}

	public enableOffscreenBuffer(): void {
		if (this._offscreenContext == null) {
			this._offscreenContext = new Canvas(this.width, this.height);
		}
	}

	public disableOffscreenBuffer(): void {
		if (this._offscreenContext != null) {
			this._offscreenContext.release();
			this._offscreenContext = null;
		}
	}

	public drawOffscreenBuffer(): void {
		if (this._offscreenContext == null) {
			console.warn('This element does not have an offscreen buffer to draw');
			return;
		}

		const nativeContext = this._contextRef.deref();
		const rect = createRectF(0, 0, this._offscreenContext.getWidth(), this._offscreenContext.getHeight());
		nativeContext.drawBitmap(this._offscreenContext.getImage(), null, rect, null);
	}

	public get view(): CanvasView {
		return this._canvasViewRef.deref();
	}

	public get nativeContext(): Canvas {
		return this._offscreenContext != null ? this._offscreenContext : this._contextRef.deref();
	}

	get width(): number {
		const context = this.nativeContext;
		return context != null ? context.getWidth() : 0;
	}

	set width(val: number) {
		const view = this.view;
		if (view) {
			view.width = val;
		}
	}

	get height(): number {
		const context = this.nativeContext;
		return context != null ? context.getHeight() : 0;
	}

	set height(val: number) {
		const view = this.view;
		if (view) {
			view.height = val;
		}
	}
}

export { NSHTMLCanvasElement as HTMLCanvasElement };
