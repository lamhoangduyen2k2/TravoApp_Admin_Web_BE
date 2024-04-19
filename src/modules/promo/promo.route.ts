import express from 'express';
import Container from 'typedi';
import { AuthMiddleware } from '../auth/auth.middleware';
import { ImageMiddleware } from '../image/image.middleware';
import { PromoController } from './promo.controller';

const promoRoute = express.Router();
const authMiddleware = Container.get(AuthMiddleware);
const imageMiddleware = Container.get(ImageMiddleware);
const promoController = Container.get(PromoController);

promoRoute.post(
    '/create-promo',
    imageMiddleware.upload.single('image'),
    authMiddleware.authentication,
    promoController.createPromo
);

promoRoute.get(
    '/get-promo-by-id',
    authMiddleware.authentication,
    promoController.getPromoById
);

promoRoute.patch(
    '/update-promo',
    imageMiddleware.upload.single('image'),
    authMiddleware.authentication,
    promoController.updatePromo
);

promoRoute.delete(
    '/remove-promo',
    authMiddleware.authentication,
    promoController.removePromo
);

export default promoRoute;