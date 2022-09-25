import { Document, Model } from "mongoose";

export class Repository<T extends Document> {
    constructor(private model: Model<T>) {}

    async create(item: T) {
        try{
            return this.model.create(item)
        }
        catch(error) {
            Promise.reject(error)
        }
    }

    async getAll(limit: number = 5 , page: number = 1, search: string = "") {
        const condition = new RegExp('.*' + search + '.*', 'i')

        try {
            const totalDocs = await this.model.countDocuments({name: condition})
            const totalPage = Math.ceil(totalDocs / limit)
            page > totalPage ? (page = totalPage) : page
            const docsView = await this.model  
                                        .find({name: condition, $isDeleted : false})
                                        .skip((page - 1) * limit) 
                                        .limit(limit)
            return {
                    currentPage: page,
                    totalPage: totalPage,
                    data: docsView
                }
        }
        catch(err) {
            return Promise.reject(err)
        }
    }

    async getById(id: string) {
        try {
            return this.model.findById({_id: id})
        }
        catch(err) {
            return Promise.reject(err)
        }
    }

    async getOne(condition: any) {
        try {
            return await this.model.findOne(condition)
        }
        catch(err) {
            return Promise.reject(err)
        }
    }

    async update(id: string, item: any) {
        try {
            await this.model.findByIdAndUpdate({_id: id}, {$set: item}).exec()
            return item
        }
        catch(err) {
            return Promise.reject(err)
        }
    }

    async updateOne(condition: any, item: any) {
        try {
            return this.model.findOneAndUpdate(condition, {$set: item})
        }
        catch(err) {
            return Promise.reject(err)
        }
        
    }

    async delete(id: string) {
        try {
            await this.model.findByIdAndDelete({_id: id})
            return "You have successfully deleted"
        }
        catch(err) {
            return Promise.reject(err)
        }
        
    }
}