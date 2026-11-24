package com.bridge.demo.service;

import com.bridge.demo.entity.ItemEntity;
import com.bridge.demo.dto.ItemDto;
import com.bridge.demo.mapper.DemoMapper;
import lombok.extern.slf4j.Slf4j;
import com.bridge.demo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
public class DemoService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private DemoMapper demoMapper;


    // insert 서비스 로직
    public boolean registerItem(ItemDto itemDto) {
        // TODO : DB INSERT
        // Mybatis
//        HashMap<String, Object> paramMap = new HashMap<>();
//        paramMap.put("id", itemDto.getId());
//        paramMap.put("name", itemDto.getName());
//
//        //art+enter 하면 자동으로 demomapper 에다 interface 가 만들어짐
//        demoMapper.registerItem(paramMap);
//
//        log.info("service...");
//        return true;

        //JPA
        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setId(itemDto.getId());
        itemEntity.setName((itemDto.getName()));
        // save : insert 기능
        itemRepository.save(itemEntity);
        return true;

    }

    // select 서비스 로직
    public ItemDto getItemById(String id) {

        //Mybatis
//        HashMap<String, Object> paramMap = new HashMap<>();
//        paramMap.put("id",id);
//        HashMap<String, Object> res = demoMapper.findById(paramMap);
//
//        ItemDto itemDto = new ItemDto();
//        itemDto.setId((String)res.get("ID"));
//        itemDto.setName((String)res.get("NAME"));
//
//        return itemDto;

        // JPA
        ItemEntity itemEntity = itemRepository.findById(id).get();
        ItemDto itemDto = new ItemDto();
        itemDto.setId(itemEntity.getId());
        itemDto.setName(itemEntity.getName());
        return itemDto;

    }

}
