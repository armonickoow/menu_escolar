import express from 'express';
import nunjucks from 'nunjucks';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();

app.use(express.static('static'));

nunjucks.configure('views', {
    express: app,
    autoscape: true,
    watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mi-clave',
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

// asignando user como variabe global
app.use((req, res, next) => {
    res.locals.user = req.session.user
    console.log(req.session.user);
    next()
});
// rutas

app.use(auth);
app.use(router)

const PORT = 4000;

app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));