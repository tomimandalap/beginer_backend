module.exports = {
  success: (res, message, pagination, data) => {
    const response = {
      code: 200,
      message,
      pagination,
      data
    }
    res.status(200).json(response)
  },
  created: (res, message, data) => {
    const response = {
      code: 201,
      message,
      data
    }
    res.status(201).json(response)
  },
  badreques: (res, message, data) => {
    const response = {
      code: 400,
      message,
      data
    }
    res.status(400).json(response)
  },
  notfound: (res, message, data) => {
    const response = {
      code: 404,
      message,
      data
    }
    res.status(404).json(response)
  },
  failed: (res, message, data) => {
    const response = {
      code: 500,
      message,
      data
    }
    res.status(500).json(response)
  }
}