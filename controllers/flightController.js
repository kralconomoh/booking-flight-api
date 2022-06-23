const { FlightModel } = require("../models/FlightModel");

const handleValidation = (req, res) => {
  const { title, time, price, date } = req.body;
  if (!title || typeof title != "string") {
    return res
      .status(500)
      .json({ message: "Title is a required field and should be a string" });
  }
  if (!time || typeof time != "string") {
    return res
      .status(500)
      .json({ message: "Time is a required field and should be a string" });
  }
  if (!price || typeof price != "number") {
    return res
      .status(500)
      .json({ message: "Price is a required field and should be a number" });
  }
  if (!date || typeof date != "string") {
    return res
      .status(500)
      .json({ message: "Date is a required field and should be a string" });
  }
  return 1;
};

exports.createFlight = (req, res) => {
  try {
    const { title, time, price, date } = req.body;

    if (handleValidation(req, res) != 1) {
      return;
    } else {
      const id = +`${Math.random() * 1000}`.split(".")[1];
      FlightModel.push({ id, title, time, price, date });
      res.status(201).send({
        message: "flight created",
        data: { id, title, time, price, date },
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.getFlight = (req, res) => {
  try {
    const id = req.params.id;
    const flight = FlightModel.filter((f) => f.id == id);
    if (flight.length <= 0)
      return res.status(404).json({ message: "flight not found" });
    res.status(200).json(flight);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.getFlights = (req, res) => {
  try {
    return res.status(200).json(FlightModel);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.updateFlight = (req, res) => {
  try {
    const id = req.params.id;
    const { title, time, price, date } = req.body;
    let updatedFlight = {};
    if (title && typeof title == "string") {
      updatedFlight = { ...updatedFlight, title };
    }
    if (time && typeof time == "string") {
      updatedFlight = { ...updatedFlight, time };
    }
    if (price && typeof price == "number") {
      updatedFlight = { ...updatedFlight, price };
    }
    if (date && typeof date == "string") {
      updatedFlight = { ...updatedFlight, date };
    }

    const flightIndex = FlightModel.findIndex((f) => f.id == id);
    if (flightIndex < 0)
      return res.status(404).json({ message: "flight not found" });
    const flight = { ...FlightModel[flightIndex], ...updatedFlight };
    if (Object.keys(updatedFlight).length > 0) {
      FlightModel.splice(flightIndex, 1, flight);
    }
    res.status(201).json(flight);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.deleteFlight = (req, res) => {
  try {
    const id = req.params.id;
    const flightIndex = FlightModel.findIndex((f) => f.id == id);
    let flight = FlightModel[flightIndex];
    if (flightIndex > 0) {
      FlightModel.splice(flightIndex, 1);
      res.status(200).json({ message: "flight deleted", data: flight });
    } else res.json({ message: "flight not found!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


exports.instructions = (req, res) => {
    const hostname = req.headers.host;
    res.send(`
    <h3>To create a flight send a request to:</h3>
    <a href='/create-flight'>${hostname}/create-flight</a>
    
    <h3>To get a single flight send a request to: </h3>
    <a href='/get-flight/1'> ${hostname}/get-flight/:id </a>
    
    <h3>To get all flights send a request to: </h3>
    <a href='/get-flights'> ${hostname}/get-flights </a>
    
    <h3> To update a flight send a request to: </h3>
    <a href='/update-flight/1'> ${hostname}/update-flight/:id </a>
    
    <h3> To delete a flight send a request to: </h3>
    <a href='/delete-flight/1'> ${hostname}/delete-flight/:id </a>
    `)
}