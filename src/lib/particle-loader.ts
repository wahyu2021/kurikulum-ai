class Particle {
    x: number;
    y: number;
    originX: number;
    originY: number;
    size: number;
    color: string;
    ease: number;
    dx = 0;
    dy = 0;
    vx = 0;
    vy = 0;
    force = 0;
    angle = 0;
    distance = 0;
    friction = Math.random() * 0.6 + 0.15;

    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;

    constructor(
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D,
        canvasWidth: number,
        canvasHeight: number
    ) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.originX = x;
        this.originY = y;
        this.size = 1.5;
        this.color = `rgba(129, 140, 248, ${Math.random() * 0.5 + 0.3})`; // Indigo-400
        this.ease = Math.random() * 0.05 + 0.02;
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update(
        mouse: { x: number | null; y: number | null; radius: number },
        targetReady: boolean
    ) {
        if (mouse.x !== null && mouse.y !== null) {
            this.dx = mouse.x - this.x;
            this.dy = mouse.y - this.y;
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            this.force = -mouse.radius / this.distance;

            if (this.distance < mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
        }

        if (targetReady) {
            this.x +=
                (this.vx *= this.friction) +
                (this.originX - this.x) * this.ease;
            this.y +=
                (this.vy *= this.friction) +
                (this.originY - this.y) * this.ease;
        } else {
            this.x += this.vx *= this.friction;
            this.y += this.vy *= this.friction;
        }
    }
}

export class ParticleLoader {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    particles: Particle[] = [];
    mouse: { x: number | null; y: number | null; radius: number } = {
        x: null,
        y: null,
        radius: 150,
    };
    targetReady: boolean = false;
    animationFrameId?: number;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvas) throw new Error("Canvas element not found!");
        this.ctx = this.canvas.getContext("2d")!;
        this.resize();
    }

    private resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };

    private initParticles() {
        this.particles = [];
        const FONT_SIZE = Math.min(this.canvas.width * 0.3, 180);
        this.ctx.fillStyle = "white";
        this.ctx.font = `bold ${FONT_SIZE}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "A I",
            this.canvas.width / 2,
            this.canvas.height / 2 + FONT_SIZE / 3
        );

        const textCoordinates = this.ctx.getImageData(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < textCoordinates.height; y += 1) {
            for (let x = 0; x < textCoordinates.width; x += 1) {
                if (
                    textCoordinates.data[
                        y * 4 * textCoordinates.width + x * 4 + 3
                    ] > 128
                ) {
                    this.particles.push(
                        new Particle(
                            x,
                            y,
                            this.ctx,
                            this.canvas.width,
                            this.canvas.height
                        )
                    );
                }
            }
        }

        const ambientParticleCount = 1000;
        for (let i = 0; i < ambientParticleCount; i++) {
            const randomX = Math.random() * this.canvas.width;
            const randomY = Math.random() * this.canvas.height;
            const p = new Particle(
                randomX,
                randomY,
                this.ctx,
                this.canvas.width,
                this.canvas.height
            );
            this.particles.push(p);
        }
    }

    private animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((p) => {
            p.draw();
            p.update(this.mouse, this.targetReady);
        });
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    private handleMouseMove = (e: MouseEvent) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    };

    private handleMouseOut = () => {
        this.mouse.x = null;
        this.mouse.y = null;
    };

    private handleResize = () => {
        this.resize();
        this.initParticles();
    };

    start() {
        this.initParticles();
        this.animate();

        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseout", this.handleMouseOut);
        window.addEventListener("resize", this.handleResize);

        setTimeout(() => {
            this.targetReady = true;
        }, 1500);
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseout", this.handleMouseOut);
        window.removeEventListener("resize", this.handleResize);
    }
}
