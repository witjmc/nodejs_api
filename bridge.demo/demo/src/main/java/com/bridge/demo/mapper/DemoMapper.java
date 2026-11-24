package com.bridge.demo.mapper;


import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;

@Mapper
public interface DemoMapper {
    HashMap<String, Object> findById(HashMap<String, Object> paramMap);

    // insert 함수라서 따로 받을 값이 없기때문에 void
    void registerItem(HashMap<String, Object> paramMap);
}
