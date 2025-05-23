import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { accessToken } from "../utils/fetchToken";
import {
    calculateAverage,
    calculateCorrelation,
} from "../utils/calculateCorrelation";

dotenv.config();

interface StockDataEntry {
    price: number;
    lastUpdatedAt: string;
}

export const getAverageStockPrice = async (req: Request, res: Response) => {
    try {
        const { ticker } = req.params;
        const { minutes, aggregation } = req.query;

        console.log("Access Token:", accessToken);

        if (!ticker || !minutes || aggregation !== "average") {
            res.status(400).json({
                success: false,
                message: "Missing ticker Or Invalid Queries",
            });
            return;
        }

        const response = await axios.get(
            `${process.env.STOCK_URL}/stocks/${ticker}?minutes=${minutes}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // Log the actual data from response
        console.log("API response data:", response.data);

        const priceHistory = response.data;

        if (!Array.isArray(priceHistory) || priceHistory.length === 0) {
            res.status(404).json({
                success: false,
                message: "No price data found",
            });
            return;
        }

        let total = 0;
        for (let i = 0; i < priceHistory.length; i++) {
            total += priceHistory[i].price;
        }

        const averageStockPrice = total / priceHistory.length;

        res.status(200).json({
            averageStockPrice,
            priceHistory,
        });
    } catch (error: any) {
        console.error(
            "Error fetching average stock price:",
            error.message || error
        );

        res.status(500).json({
            success: false,
            message: "Cannot get the average price of stock",
        });
        return;
    }
};

interface StockDataEntry {
  price: number;
  lastUpdatedAt: string;
}


// interface StockDataResponse {
//   data: StockDataEntry[];
// }



export const getStockCorrelation = async (req: Request, res: Response) => {
  try {
    const minutes = Number(req.query.minutes);
    const ticker1 = req.query.ticker1 as string;
    const ticker2 = req.query.ticker2 as string

    console.log(minutes, ticker1, ticker2)

    if (!minutes || !ticker1 || !ticker2) {
      res.status(400).json({
        success: false,
        message: "Please provide exactly two ticker symbols and minutes",
      });
      return;
    }

    const response1 = await axios.get<StockDataEntry[]>(
            `${process.env.STOCK_URL}/stocks/${ticker1}?minutes=${minutes}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

    const response2 = await axios.get<StockDataEntry[]>(
      `${process.env.STOCK_URL}/stocks/${ticker2}?minutes=${minutes}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    const data1= response1.data
    const data2 = response2.data

    console.log(data1)

    console.log(data2)

    const prices1 = data1.map((entry) => entry.price)
    const prices2 = data2.map((entry) => entry.price);

    const correlation = calculateCorrelation(prices1, prices2);
    const averageX = calculateAverage(prices1);
    const averageY = calculateAverage(prices2);

    res.status(200).json({
      correlation,
      stock: {
        [ticker1]: {
          average: averageX,
          priceHistory: data1,
        },
        [ticker2]: {
          average: averageY,
          priceHistory: data2,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching correlation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch correlation",
    });
  }
};

