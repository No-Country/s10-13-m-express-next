import {donationEntity} from '../entities/donation.entity'

export interface createDonation extends Omit<donationEntity, 'id' | 'createdAt'>{}