const db = require("../models");
const User = db.user;
const ProjectRequest = db.projectRequest;
const { Op } = require("sequelize");

exports.getUserDashboardData = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findOne({
            where: { RecID: userId },
            attributes: ['FullName', 'Email']
        });

        if (!user) return res.status(404).send({ message: "User not found" });

        const totalProjects = await ProjectRequest.count({ where: { CustomerID: userId } });
        const quotesReceived = 0; // Ye tab real hoga jab bids table jurega
        const potentialPower = "12.5 kW"; // Ye aagay chal kar AI logic se aayega

        const recentProjects = await ProjectRequest.findAll({
            where: { CustomerID: userId },
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).send({
            user: {
                fullName: user.FullName,
                email: user.Email
            },
            stats: {
                totalProjects: totalProjects || 0,
                quotesReceived: quotesReceived,
                potentialPower: potentialPower
            },
            recentProjects: recentProjects.map(proj => ({
                id: proj.RecID,
                name: proj.ProjectName || "Unnamed Project",
                date: proj.createdAt,
                status: proj.Status || "Pending",
                aiOutput: proj.AI_Status === 'Ready' ? "3D Ready" : "Processing",
                vendorQuote: "Pending"
            }))
        });
    } catch (error) {
        console.error("Dashboard Controller Error:", error);
        res.status(500).send({ message: "Server error: " + error.message });
    }
};