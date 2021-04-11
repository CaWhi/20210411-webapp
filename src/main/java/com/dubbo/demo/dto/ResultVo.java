package com.dubbo.demo.dto;

import java.io.Serializable;

public class ResultVo implements Serializable {
    private static final long serialVersionUID = -7985253222638053052L;

    private int code;
    private String info;
    private Object result;

    public ResultVo(int code, String info, Object result) {
        this.code = code;
        this.info = info;
        this.result = result;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
