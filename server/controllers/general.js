import User from "../models/User.js";
import OverallSales from "../models/OverallSales.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";
    const dailySales = 12345;
    const monthlySales = 74689;

    /* Overall Stats */
    const overallSales = await OverallSales.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallSales[0];

    const thisMonthSales = overallSales[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todaySales = overallSales[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      dailySales,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      monthlySales,
      salesByCategory,
      thisMonthSales,
      todaySales
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};