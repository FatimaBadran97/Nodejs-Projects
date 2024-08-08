const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError,} = require('../errors');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')

  res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
  const {user:{userId}, params:{id}} = req
  const job = await Job.findOne({_id: id, createdBy: userId})

  if(!job){
    throw new NotFoundError(`Job Not Found with id: ${id}`)
  }

  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)

  res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async (req, res) => {
  const {user:{userId}, params:{id}} = req

  const {company, position} = req.body

  if(company === '' || position === ''){
    throw new BadRequestError('Company or Position fields connt be empty')
  }

  const job = await Job.findOneAndUpdate({_id: id, createdBy: userId}, {company, position}, {new: true, runValidators: true})

  if(!job){
    throw new NotFoundError(`Job Not Found with id: ${id}`)
  }

  res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
  const {user:{userId}, params:{id}} = req
  const job = await Job.findOneAndDelete({_id: id, createdBy: userId})

  if(!job){
    throw new NotFoundError(`Job Not Found with id: ${id}`)
  }

  res.status(StatusCodes.OK).json({job})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
