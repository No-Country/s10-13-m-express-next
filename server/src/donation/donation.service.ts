import { Injectable, ConflictException } from '@nestjs/common';
import { Donation } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationService {
    constructor(private readonly prisma: PrismaService){
    }
    async findAllDonation(): Promise<Donation[]> {
        try {
            const donations = await this.prisma.donation.findMany()
            if (donations.length == 0){
                throw new ConflictException('Donation not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationById(id: string): Promise<Donation>{
        try {
            const donation = await this.prisma.donation.findUnique({
                where: {id: id}
            })
            if (!donation){
                throw new ConflictException('Donation Id not found');
            }else{
                return donation
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationsByUserId(id: string): Promise<Donation[]>{
        try {
            const donations = await this.prisma.donation.findMany({
                where: {userId: id}
            })
            if (donations.length == 0){
                throw new ConflictException('Donations of user id not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationsByInitiativeId(id: string): Promise<Donation[]>{
        try {
            console.log('aqui')
            const donations = await this.prisma.donation.findMany({
                where: {initiativeID: id}
            })
            if (donations.length == 0){
                throw new ConflictException('Donation of initiative id not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationsGlobal(): Promise<Donation[]>{
        try {
            const donations = await this.prisma.donation.findMany({
                where: {isGlobalDonation: true}
            })
            console.log(donations)
            if (donations.length == 0){
                throw new ConflictException('Donations global not found');
            }else{
                return donations
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}
