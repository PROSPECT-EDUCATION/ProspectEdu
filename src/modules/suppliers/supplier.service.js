import Supplier from "./supplier.model.js";
import { User } from "../users/user.model.js";


export const getMySupplierProfile = async (userId) => {
  return Supplier.findOne({ userId });
};

export const applySupplier = async (userId, data) => {
  const exists = await Supplier.findOne({ userId });
  if (exists) throw new Error("Supplier application already exists");

  return Supplier.create({ userId, ...data });
};

export const listApplications = async (status) => {
  return Supplier.find(status ? { status } : {}).populate("userId", "name email");
};

export const approveSupplier = async (supplierId, adminId) => {
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) throw new Error("Supplier not found");

  supplier.status = "approved";
  supplier.reviewedBy = adminId;
  await supplier.save();

  await User.findByIdAndUpdate(supplier.userId, {
    role: "supplier",
  });

  return supplier;
};

export const rejectSupplier = async (supplierId, adminId, note) => {
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) throw new Error("Supplier not found");

  supplier.status = "rejected";
  supplier.reviewedBy = adminId;
  supplier.reviewNote = note;
  await supplier.save();

  return supplier;
};
export const updateMySupplierProfile = async (userId, data) => {
  const supplier = await Supplier.findOne({ userId });
  if (!supplier) throw new Error("Supplier profile not found");

  // ✅ Only allow safe fields (PAN/GSTIN etc. will never be updated)
  if (data.shopName !== undefined) supplier.shopName = data.shopName;
  if (data.ownerName !== undefined) supplier.ownerName = data.ownerName;
  if (data.phone !== undefined) supplier.phone = data.phone;
  if (data.categories !== undefined) supplier.categories = data.categories;

  if (data.pickupAddress) {
    supplier.pickupAddress = {
      ...supplier.pickupAddress,
      ...data.pickupAddress,
    };
  }

  if (data.bank) {
    supplier.bank = {
      ...supplier.bank,
      ...data.bank,
    };
  }

  // ✅ HARD BLOCK: even if sent, do not update
  // supplier.kyc = supplier.kyc; // no changes
  // supplier.status = supplier.status; // no changes

  await supplier.save();
  return supplier;
};

