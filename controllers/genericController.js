// Generic CRUD operations for any model
const serializeRecord = (record) => {
  const plain = record && typeof record.toObject === 'function' ? record.toObject() : { ...record };

  if (plain && plain._id && !plain.id) {
    plain.id = plain._id.toString();
  }

  return plain;
};

const getAllRecords = (Model) => async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-created_date' } = req.query;
    const skip = (page - 1) * limit;

    const records = await Model.find()
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Model.countDocuments();
    const serializedRecords = records.map(serializeRecord);

    // res.json({
    //   success: true,
    //   data: records,
    //   pagination: {
    //     page: parseInt(page),
    //     limit: parseInt(limit),
    //     total,
    //     pages: Math.ceil(total / limit),
    //   },
    // });
    res.json(serializedRecords);
  } catch (error) {
    next(error);
  }
};

const getRecordById = (Model) => async (req, res, next) => {
  try {
    const record = await Model.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    res.json({
      success: true,
      data: serializeRecord(record),
    });
  } catch (error) {
    next(error);
  }
};

const createRecord = (Model) => async (req, res, next) => {
  try {
    const record = new Model(req.body);
    const savedRecord = await record.save();

    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: serializeRecord(savedRecord),
    });
  } catch (error) {
    next(error);
  }
};

const updateRecord = (Model) => async (req, res, next) => {
  try {
    const record = await Model.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_date: new Date() },
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    res.json({
      success: true,
      message: 'Record updated successfully',
      data: serializeRecord(record),
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecord = (Model) => async (req, res, next) => {
  try {
    const record = await Model.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    res.json({
      success: true,
      message: 'Record deleted successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

const bulkCreate = (Model) => async (req, res, next) => {
  try {
    const records = await Model.insertMany(req.body);
    const serializedRecords = records.map(serializeRecord);

    res.status(201).json({
      success: true,
      message: `${records.length} records created successfully`,
      data: serializedRecords,
    });
  } catch (error) {
    next(error);
  }
};

const bulkUpdate = (Model) => async (req, res, next) => {
  try {
    const { ids, updateData } = req.body;
    
    const result = await Model.updateMany(
      { _id: { $in: ids } },
      { ...updateData, updated_date: new Date() }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} records updated successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const bulkDelete = (Model) => async (req, res, next) => {
  try {
    const { ids } = req.body;
    
    const result = await Model.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${result.deletedCount} records deleted successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateMany = (Model) => async (req, res, next) => {
  try {
    const result = await Model.updateMany(req.body.filter || {}, req.body.update);

    res.json({
      success: true,
      message: `${result.modifiedCount} records updated successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMany = (Model) => async (req, res, next) => {
  try {
    const result = await Model.deleteMany(req.body.filter || {});

    res.json({
      success: true,
      message: `${result.deletedCount} records deleted successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const restore = (Model) => async (req, res, next) => {
  try {
    // For future soft delete implementation
    res.json({
      success: true,
      message: 'Restore functionality not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  bulkCreate,
  bulkUpdate,
  bulkDelete,
  updateMany,
  deleteMany,
  restore,
};
