<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <!--email-->
      <label for="">Email</label>
      <input type="email" required v-model="email" />
      <!--password-->
      <label for="">Password</label>
      <input type="password" required v-model="password" />
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <!--job-->
      <label for="">Job :</label>
      <select v-model="role">
        <option value="developer">Web Developer</option>
        <option value="designer">Web Designer</option>
        <option value="manager">Project Manager</option>
      </select>
      <!--skills-->
      <label>Skills</label>
      <input type="text" v-model="tempSkill" @keyup.alt="addskill" />
      <div v-for="Skills in Skills" :key="Skills" class="pill">
        <span @click="deleteSkill(Skills)">{{ Skills }}</span>
      </div>

      <div class="terms">
        <input type="checkbox" v-model="terms" required />
        <label class="conditions">ACCEPT TERMS AND CONDITIONS</label>
      </div>

      <div class="submit">
        <button>Create Account</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      role: "developer",
      terms: false,
      tempSkill: "",
      Skills: [],
      passwordError: "",
    };
  },
  methods: {
    addskill(event) {
      if (event.key === "," && this.tempSkill) {
        if (!this.Skills.includes(this.tempSkill)) {
          this.Skills.push(this.tempSkill);
        }
        this.tempSkill = "";
      }
    },
    deleteSkill(Skills) {
      //delete entered skills
      this.Skills = this.Skills.filter((item) => {
        return Skills !== item;
      });
    },
    handleSubmit() {
      //validate password
      this.passwordError =
        this.password.length > 5
          ? ""
          : "Password must be atleast six characters long";

      if (!this.passwordError) {
        console.log("email :", this.email);
        console.log("password :", this.password);
        console.log("role :", this.role);
        console.log("Skills :", this.Skills);
        console.log("Terms Accepted :", this.terms);
      }
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  font-size: 1rem;
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
  border-radius: 9px;
}
option {
  font-size: 1rem;
}
input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 20px 10pc 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  max-width: 9rem;
  cursor: pointer;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
