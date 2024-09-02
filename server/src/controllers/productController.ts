import { Request, Response } from "express";
import { product, productModel } from "../database/models/productModel";
import { filterBuilder, queryProps } from "../utils/filterBuilder";
import { log } from "console";

const getAllProducts = async (req: Request, res: Response) => {
  const gamesPerPage = 8;
  const pageNumber = parseInt(
    req.query.pageNumber ? req.query.pageNumber.toString() : "1"
  );
  const skip = (pageNumber - 1) * gamesPerPage;
  const query: any = req.query;

  const filter: queryProps = {
    genre: query.genre,
    age: query.age,
    minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
    maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
  };
  const filters = filterBuilder(filter);
  try {
    const products = await productModel
      .find(filters)
      .skip(skip)
      .limit(gamesPerPage)
      .populate("reviews");
    const total = await productModel.countDocuments();
    if (products) {
      res.status(200).json({
        games: products,
        pagination: {
          pageNumber,
          total,
          gamesPerPage,
          pages: Math.ceil(total / gamesPerPage),
        },
      });
    } else {
      res.status(401).json({ message: "No products found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId).populate("reviews");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const updateTest = async () => {
  const newProduct = {
    _id: "669023ac654037394c65b0de",
    name: "Call of Duty: Black Ops Cold War",
    price: "50",
    description:
      "Call of Duty: Black Ops Cold War, released in 2020, takes players back to the early 1980s, during one of the most volatile times of the Cold War. This installment is a direct sequel to the original Black Ops game. Players assume the role of elite operatives pursuing a shadowy Soviet agent named Perseus who is on a mission to destabilize the global balance of power. The game features a gripping campaign filled with twists and conspiracies, robust multiplayer modes, and the beloved Zombies mode. With period-accurate weapons and technology, Cold War offers a nostalgic yet fresh experience in the Call of Duty franchise.",
    stock: "17",
    genre: ["shooters", "action"],
    age: "18",

    images: [
      "http://res.cloudinary.com/douiewtee/image/upload/v1721587604/dy56mwsw0zl7nllt8810.png",
      "http://res.cloudinary.com/douiewtee/image/upload/v1721587610/pn7wqf1mv62ajwu9wzvo.jpg",
    ],
  };

  try {
    const update = await productModel.findByIdAndUpdate(
      newProduct._id,
      newProduct
    );
    console.log(update);
  } catch (error) {
    console.log(error);
  }
};

const getHomePageProducts = async (req: Request, res: Response) => {
  let homePageGames: {
    trending?: product[];
    shooters?: product[];
    adventure?: product[];
    sports?: product[];
  } = {};
  try {
    const trending = await productModel.find({
      _id: {
        $in: [
          "6690234c654037394c65b0db",
          "6693e0860e4b97494e6d0d2c",
          "669b5cd062e32c489091d72e",
        ],
      },
    });

    const shooters = await productModel
      .find({
        genre: "shooters",
      })
      .populate("reviews");
    const adventure = await productModel
      .find({
        genre: "adventure",
      })
      .populate("reviews");
    const sports = await productModel
      .find({ genre: "sports" })
      .populate("reviews");

    if (trending) {
      homePageGames.trending = trending;
    }
    if (shooters) {
      homePageGames.shooters = shooters;
    }
    if (adventure) {
      homePageGames.adventure = adventure;
    }

    if (sports) {
      homePageGames.sports = sports;
    }

    if (
      homePageGames.adventure &&
      homePageGames.shooters &&
      homePageGames.sports &&
      homePageGames.trending
    ) {
      res.status(200).json(homePageGames);
    } else {
      res.status(400).json({ message: "Could not load page, Pls try again" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

export { getAllProducts, getProductById, updateTest, getHomePageProducts };
