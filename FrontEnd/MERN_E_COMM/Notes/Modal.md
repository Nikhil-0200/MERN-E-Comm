# Handling Modals in React with Redux (Simple Guide)

## Goal:
Show a pop-up (modal) when deleting a product from the cart, allowing the user to confirm or cancel the action.

---

## 1. Set Up State for Modal Visibility:
We use `useState()` to manage whether the modal is visible or not:

const [openModal, setOpenModal] = useState(false)

---

## 2. Show the Modal When Needed:
When the user clicks Remove, open the modal for the specific product:
setOpenModal(product.id);
---


## 3. Modal Component:
The modal displays a title, message, and buttons for user actions.

Props for Modal Component:
title: What the modal is about.
message: The message shown to the user.
dangerAction: The function to delete the product.
cancelAction: The function to close the modal without deleting.
showModal: Controls whether the modal is visible.

## 4. Handle User Actions:
Delete the Product:
When the user clicks Delete, remove the item from the cart:
dispatch(deleteItemsAsync(id));

Cancel the Action:
Close the modal without deleting:
setOpenModal(-1);

# Example Code Flow:
## Parent Component (Cart):
This component displays products and handles modal actions.

<Modal
  title={`Delete ${product.product.title}`}
  message="Are you sure you want to delete this item?"
  dangerOption="Delete"
  cancelOption="Cancel"
  dangerAction={(e) => handleDelete(e, product.id)}
  cancelAction={(e) => setOpenModal(-1)}
  showModal={openModal === product.id}
/>

## Modal Component Logic:
const [open, setOpen] = useState(false);

useEffect(() => {
  if (showModal) {
    setOpen(true);
  } else {
    setOpen(false);
  }
}, [showModal]);


## Summary:
Dynamic Modals: Use product IDs to target specific items.
Reusable Component: Make the modal flexible for different actions.
Button Actions: Always provide delete and cancel options for smooth user experience