const Employee = require('../models/Employee11111');

const employeeController = {};

employeeController.list = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render("../views/employee/index", { employees });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
    }
};

employeeController.show = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        res.render("../views/employee/show", { employee });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
    }
};

employeeController.create = (req, res) => {
    res.render("../views/employee/create");
};

employeeController.save = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        console.log("Successfully created an employee.");
        res.redirect("/employees/show/" + employee._id);
    } catch (err) {
        console.error(err);
        res.render("../views/employee/create");
    }
};

employeeController.edit = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        res.render("../views/employee/edit", { employee });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal server error");
    }
};

employeeController.update = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/employees/show/" + employee._id);
    } catch (err) {
        console.error(err);
        res.render("../views/employee/edit", { employee: req.body });
    }
};

employeeController.delete = async (req, res) => {
    try {
        await Employee.remove({ _id: req.params.id });
        console.log("Employee deleted!");
        res.redirect("/employee");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

module.exports = employeeController;
