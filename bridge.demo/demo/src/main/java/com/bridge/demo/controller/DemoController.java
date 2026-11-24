package com.bridge.demo.controller;
import com.bridge.demo.dto.ItemDto;
import com.bridge.demo.dto.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bridge.demo.service.DemoService;

@RestController
@Slf4j
public class DemoController {

    @Autowired
    private DemoService demoService;

    @GetMapping("/member")
    public String getMember(@RequestParam("empNo") String empNo,
                            @RequestParam("year") int year) {
        log.info("empNo: {}", empNo);
        log.info("year: {}", year);
        return "ok";
    }

    @GetMapping("/company/{id}")
    public String getCompany(@PathVariable("id") String id){
        log.info("id: {}", id);
        return "ok";
    }

    @PostMapping("/item")
    public String registerItem1(@RequestBody String item){
        log.info("item: {}", item);
        return "ok";
    }

    //등록
    //ItemDto 클래스가 { id: string, name: string } 으로 json 형태 입력 및 호출
    @PostMapping("/item2")
    public ResponseDto registerItem2(@RequestBody ItemDto item) {
        log.info("item: {}", item);
        ResponseDto responseDto = new ResponseDto();
        responseDto.setMessage("ok");
        return responseDto;
    }

   // service 클래스의 insert 로직
    @PostMapping("/item3")
    public ResponseDto registerItem3(@RequestBody ItemDto item) {
        log.info("item: {}", item);

        //DemoService demoService = new DemoService();
        //@Service 클래스를 인스턴스하면 자동으로 new 를 생성해주기 때문에
        // 이렇게 만들 필요 없고, 지역변수에다 @Autowired 달면 @Service 클래스의
        // 터압아 DemoService을 찾아서 인스턴스함

        boolean b = demoService.registerItem(item);
        if(b == true) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setMessage("ok");
            return responseDto;
        }
        ResponseDto responseDto = new ResponseDto();
        responseDto.setMessage("fail");
        return responseDto;
    }

    // service 클래스의 select 로직
    @GetMapping("/item4")
    public ItemDto getItem(@RequestParam("id") String id) {
        ItemDto res =demoService.getItemById(id);
        return res;
    }

}



