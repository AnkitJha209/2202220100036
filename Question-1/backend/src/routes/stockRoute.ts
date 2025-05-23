import express, { Router } from 'express'
import { getAverageStockPrice, getStockCorrelation } from '../controller/getStockPrices';

export const stockRouter : Router = express.Router();

stockRouter.get('/stock/:ticker', getAverageStockPrice);
stockRouter.get('/stockcorrelation', getStockCorrelation)


