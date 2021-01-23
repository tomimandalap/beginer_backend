module.exports = {
  success: (res, message, pagination, data) => {
    const response = {
      code: 200,
      message,
      pagination,
      data
    }
    res.json(response)
  },
  created: (res, message, data) => {
    const response = {
      code: 201,
      message,
      data
    }
    res.json(response)
  },
  badreques: (res, message, data) => {
    const response = {
      code: 400,
      message,
      data
    }
    res.json(response)
  },
  notfound: (res, message, data) => {
    const response = {
      code: 404,
      message,
      data
    }
    res.json(response)
  },
  failed: (res, message, data) => {
    const response = {
      code: 500,
      message,
      data
    }
    res.json(response)
  }
}