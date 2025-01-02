const asyncHandler = require("express-async-handler")
const Contact=require("../models/contactModel")
// description for geet all contacts
// @route GET /api/contacts
// @access public
// using async because of returnment of promise
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();

    // res.status(200).json({ message: "Get all contact route" })
    res.status(200).json(contacts)
});
// description for create contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    // console.log("the input body is ",req.body)
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contact);
    // res.status(201).json({ message: `{Creating the contact ${req.body?.name} in my list with mail id as ${req.body?.email}}` })
});
// description for get contacts by id
// @route GET /api/contacts
// @access public

const getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
    // res.status(200).json({ message: `{get all contacts route for ${req.params.id}}` })
});
// description for update contacts
// @route PUT /api/contacts
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateContact);
    // res.status(200).json({ message: `{Update all contacts route for ${req.params.id}}` })
});
// description for DELETE  contacts
// @route DELETE /api/contacts
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne(contact);
    res.status(200).json(contact);
    // res.status(200).json({ message: `{Delete  contacts route for ${req.params.id}}` })
});

// we have wrapped all in the async handler which behaves like the try catch block for exceptional error handleing
module.exports = {getContact, createContact, getContactById, updateContact, deleteContact}