const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Retorna dados para o dashboard
 *     responses:
 *       200:
 *         description: Dados do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCustomers:
 *                   type: number
 *                 newCustomers:
 *                   type: number
 *                 customersByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       total:
 *                         type: number
 *                 topDomains:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       domain:
 *                         type: string
 *                       total:
 *                         type: number
 */
router.get("/", DashboardController.index);

module.exports = router;
