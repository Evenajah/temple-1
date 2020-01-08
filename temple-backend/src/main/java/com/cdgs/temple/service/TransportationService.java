package com.cdgs.temple.service;

import java.util.List;

import com.cdgs.temple.dto.TransportationDto;

public interface TransportationService {
	List<TransportationDto> getTransportationName();
	
	TransportationDto createTransportation(TransportationDto transporatation);
	
	TransportationDto updateTransportation (Long id,TransportationDto transportation);
	
	TransportationDto updateTransportationTemple (Long id,TransportationDto transportation);
	
	Boolean deleteTransportation (Long id,TransportationDto transportation);
	
	List<TransportationDto> getTransportationTemple();
	
	Boolean deleteTransportationTemple (Long id);
	
}
