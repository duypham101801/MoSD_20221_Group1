const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const AreaRouter = require("./routes/areaRouter");
const LocationRouter = require("./routes/locationRouter");
const HouseRouter = require('./routes/houseRouter');
const ChatRouter = require('./routes/chatRouter');
const ImageRouter = require('./routes/imageRouter');
const ErrorHandler = require('./error/errorHandler');
const CategoryRouter = require('./routes/categoryRouter');
const AccountRouter = require('./routes/accountRouter');
const AuthRouter = require('./routes/authRouter');
const FileRouter = require("./routes/fileRouter");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

const app = express();
app.use(middleware.handle(i18next));

// enabling cors for all requests by using cors middleware
const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
};
app.use(cors(corsOptions));
// Enable pre-flight
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', AuthRouter);
app.use('/api/area', AreaRouter);
app.use("/api/location", LocationRouter);
app.use('/api/house', HouseRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/image', ImageRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/account', AccountRouter);
app.use('/api/file', FileRouter);

// error handler
app.use(ErrorHandler);


module.exports = app;