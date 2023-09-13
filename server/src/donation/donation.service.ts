import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationService {
    constructor(private readonly prisma: PrismaService){
    }
    async findAllDonation() {
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

    async findDonationById(id: string){
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

    async findDonationsByUserId(id: string){
        try {
            const donations = await this.prisma.donation.findMany({
                where: {userId: id}
            })
            if (!donations){
                throw new ConflictException('Donations of user id not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationsByInitiativeId(id: string){
        try {
            const donations = await this.prisma.donation.findMany({
                where: {initiativeID: id}
            })
            if (!donations){
                throw new ConflictException('Donation of initiative id not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }

    async findDonationsGlobal(){
        try {
            const donations = await this.prisma.donation.findMany({
                where: {isGlobalDonation: true}
            })
            if (!donations){
                throw new ConflictException('Donation global not found');
            }else{
                return donations
            }
        } catch (error) {
            throw error;
        }
    }
}
