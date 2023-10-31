import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { RealEstateDocumentModel } from "../models/real-estate-document.model";

/**
 * Service which is responsible for all database operations related to the real estate documents.
*/
@Injectable()
export class RealEstateDbService {
    /**
     * Constructor for RealEstateDbService.
     * @param model Mongoose Model instance for the real estate document.
    */
    constructor(@InjectModel('RealEstateDocumentSchema') private readonly model: Model<RealEstateDocumentModel>) { }
    
    /**
     * Inserts a new real estate document into the database.
     * @param data The data for the new document.
     * @returns A Promise that resolves to the inserted document.
     * @throws InternalServerErrorException if there was an error while inserting the document.
     */
    async insertNewDocument(data: RealEstateDocumentModel) {
        try {
            const realEstateDocument = new this.model(data);
            return await realEstateDocument.save();
        } catch (error) {
            throw new InternalServerErrorException(`Failed to insert new document: ${error.message}`);
        }
    }
    
    /**
     * Retrieves a document from the database by its ID.
     * @param id The ID of the document to retrieve.
     * @returns A Promise that resolves to the retrieved document.
     * @throws NotFoundException if no document with the given ID is found.
     */
    async getDocumentById(id: string) {
        const document = await this.model.findById(id).exec();

        if (!document) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }

        return document;
    }

    /**
     * Updates a document in the database by its ID.
     * @param id The ID of the document to update.
     * @param data The data to update the document with.
     * @returns A Promise that resolves to the updated document.
     * @throws NotFoundException if no document with the given ID is found.
     */
    async updateDocumentById(id: string, data: RealEstateDocumentModel) {
        const updatedDocument = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();

        if (!updatedDocument) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }

        return updatedDocument;
    }

    /**
     * Deletes a document from the database by its ID.
     * @param id The ID of the document to delete.
     * @returns A Promise that resolves to the deleted document.
     * @throws NotFoundException if no document with the given ID is found.
     */
    async deleteDocumentById(id: string) {
        const deletedDocument = await this.model.findByIdAndDelete(id).exec();

        if (!deletedDocument) {
            throw new NotFoundException(`Document with id ${id} not found`);
        }
    }
}