import { Controller, Get, Param, BadRequestException, ConflictException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DonationService } from './donation.service';

@ApiBearerAuth()
@ApiTags('Donation')
@Controller('donation')
export class DonationController {
    constructor(private readonly donationService: DonationService){
    }
    @ApiTags('Donation')
    @Get()
    async getAllDonation(){
        try {
            const donations = await this.donationService.findAllDonation()
            return {donations, message: 'Donations found Successfully'}
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
              ) {
                throw error;
              } else {
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    @Get('global')
    async getDonationsGlobal(){
        try {
            const donations = await this.donationService.findDonationsGlobal()
            return {donations, message: 'Donations found Successfully'}
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
              ) {
                throw error;
              } else {
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    @Get(':id')
    async getDonationById(@Param('id') id: string){
        try {
            const donation = await this.donationService.findDonationById(id)
            return {donation, message: 'Donation found Successfully'}
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
              ) {
                throw error;
              } else {
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    @Get('user/:id')
    async getDonationByUserId(@Param('id') id: string){
        try {
            const donation = await this.donationService.findDonationsByUserId(id)
            return {donation, message: 'Donations found Successfully'}
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
              ) {
                throw error;
              } else {
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    @Get('initiative/:id')
    async getDonationByInitiativeId(@Param('id') id: string){
        try {
            const donation = await this.donationService.findDonationsByInitiativeId(id)
            return {donation, message: 'Donation found Successfully'}
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
              ) {
                throw error;
              } else {
                throw new BadRequestException('Something bad happened', {
                  cause: error,
                });
              }
        }
    }

    
}
