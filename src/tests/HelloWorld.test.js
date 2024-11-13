import { mount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld.vue";
import { describe, it, expect } from "vitest";
import EvincedUT, { configure } from "@evinced/unit-tester";

Object.defineProperty(global, "EvincedUT", {
  value: EvincedUT,
});

configure({
  serviceAccountId: process.env.EVINCED_SERVICE_ID,
  serviceAccountSecret: process.env.EVINCED_API_KEY,
});

describe("HelloWorld", () => {
  it("increments count on button click", async () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: "Hello, Vitest!",
      },
      attachTo: document.body
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.text()).toContain("count is 1");
    const results = await EvincedUT.analyzeButton({ selector: "button" });
    expect(results).toHaveNoFailures();
  });
});
