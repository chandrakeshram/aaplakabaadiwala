// backend/controllers/pickupController.js
import Pickup from '../models/Pickup.js';
import axios from "axios";

// WhatsApp Cloud API credentials (store in .env file)
const WHATSAPP_API_URL = "https://graph.facebook.com/v21.0";
const PHONE_NUMBER_ID = "684957801376808"; 
const ACCESS_TOKEN = "EAARlCwPtX00BPHBfTZADg2zEKbb2PYjTsS5hjO5VJGacnejnSussHMPOZBaDQsgCLM955Ng71bniPlMICRqGvra1wcdQYCsRUTQMhbHQgBG96OEroS5i9sb9Ny3BpElNauOHdPzWV9lTxIcZBWwbTfqNZBTdt8CxAm03fqGyealYzGTQUJb9wWE3AchdNnMp1qYfOnfzZBnE9c13ZCwmYiuqxwqOJZCxA2CHHUTs5mtkQZDZD";
const phone_no = '917875843473';
/**
 * Send a WhatsApp message using Meta's Cloud API
 * @param {string} to - Recipient's phone number in international format (e.g., "91XXXXXXXXXX")
 * @param {string} message - Message content
 */
const sendWhatsappNotification = async (to, message) => {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to:to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp message sent:", response.data);
  } catch (error) {
    console.error(
      "❌ WhatsApp API error:",
      error.response?.data || error.message
    );
  }
};

// Create a new pickup
export const createPickup = async (req, res) => {
  try {
    const { userId, userName, address, phone, date, time } = req.body;

    const newPickup = new Pickup({
      userId,
      userName,
      address,
      phone,
      date,
      time,
    });
    await newPickup.save();

    // Format WhatsApp message
    const message = `*New Scrap Pickup Request!*\n\n👤 User: ${userName}\n📍 Address: ${address}\n📞 Phone: ${phone}\n📅 Date: ${date} at ${time}\n📦 Status: ${newPickup.status}`;

    // Send WhatsApp notification to entered phone number
    await sendWhatsappNotification(phone_no, message);

    res
      .status(201)
      .json({ message: "Pickup booked successfully!", pickup: newPickup });
  } catch (error) {
    res.status(400).json({ message: "Error creating pickup.", error });
  }
};

// Get all pickups (for admin)
export const getPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    res.status(200).json({ pickups });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pickups.", error });
  }
};

// Update pickup status (for admin)
export const updatePickupStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const pickup = await Pickup.findByIdAndUpdate(id, { status }, { new: true });

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.status(200).json({ message: "Pickup status updated.", pickup });
  } catch (error) {
    res.status(400).json({ message: "Error updating status.", error });
  }
};

// Delete a pickup (for admin)
export const deletePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const pickup = await Pickup.findByIdAndDelete(id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    res.status(200).json({ message: "Pickup deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Error deleting pickup.", error });
  }
};
