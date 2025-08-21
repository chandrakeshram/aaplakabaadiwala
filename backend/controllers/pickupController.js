import Pickup from '../models/Pickup.js';
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// WhatsApp Cloud API credentials (store in .env file)
const WHATSAPP_API_URL = "https://graph.facebook.com/v21.0";
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID; 
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const phone_no = process.env.OWNER_PHONE_NUMBER;

/**
 * Send a WhatsApp message using Meta's Cloud APIs
 * @param {string} to - Recipient's phone number in international format (e.g., "91XXXXXXXXXX")
 * @param {string} templateName - Name of the template to use
 * @param {object} templateData - Dynamic data for the template placeholders
 */
const sendWhatsappNotification = async (to, templateName, templateData) => {
  try {
    console.log(templateData);
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to ,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: templateData.customer_name }, // {{1}}
                { type: "text", text: templateData.phone },         // {{2}}
              ],
            },
          ],
        },
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
    const { userId, userName, address, phone, date } = req.body;

    const newPickup = new Pickup({
      userId,
      userName,
      address,
      phone,
      date,
    });
    await newPickup.save();

    // Template-specific data for the WhatsApp message
    const templateData = {
      customer_name: userName,
      phone :phone,
    };

    // Send WhatsApp notification using the template
    await sendWhatsappNotification(phone_no, "mytemplate2", templateData);

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
