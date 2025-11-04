const students = [
  "Mia",
  "Arjun",
  "Zoe",
  "Priyanshi",
  "Leo",
  "Aditi",
  "Benjamin",
  "Riya",
  "Samuel",
  "Kavya",
  "Alexander",
  "Ishaan",
  "Emily",
  "Christopher ",
  "Maximilliana"
];

function sortingHat(students){
    let gryffindor=[];
    let slytherin=[];
    let hufflepuff=[];
    let ravenclaw=[];

    students.forEach(student => {
        if(student.length<=6){
            gryffindor.push(student);
        }else if(student.length<=8){
            hufflepuff.push(student);
        }else if(student.length<12){
            ravenclaw.push(student);
        }
        else{
            slytherin.push(student);
        }
        
    });
    console.log(`Students chosen for Gryffindor: ${gryffindor}`);
    console.log(`Students chosen for Hufflepuff: ${hufflepuff}`);
    console.log(`Students chosen for Ravenclaw: ${ravenclaw}`);
    console.log(`Students chosen for Slytherin: ${slytherin}`);

}

sortingHat(students)