const Koa = require( 'koa' );
const Router = require( '@koa/router' );

const router = new Router();
const app = new Koa();

app.use( async ( ctx,next ) => {
    console.log( 11111111 );
    ctx.body = 'Hello World';
    await next()//决定 执行下一个use中间件
    console.log( 3333 );
});
app.use( async ( ctx,next) => {
    console.log( 222222 );
    ctx.body = 'New';
    await next()
});

app.use(router.routes())
app.use(router.allowedMethods())

router.get( '/test', async ( ctx, next ) => {
    ctx.body = 'test';
    // await next()
});
router.get( '/new', async ( ctx ) => {
    ctx.body = 'New';
});

app.listen( 3000 );
console.log( 'app started at port 3000...' );