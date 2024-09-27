import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PieChartComponent implements OnInit {

  categories = [
    { name: 'HR', value: 0 },
    { name: 'Developer', value: 0 },
    { name: 'Tester', value: 0 }
  ];

  ngOnInit() {
    this.updateUserCounts();
  }

  updateUserCounts() {
    let storedUsers = sessionStorage.getItem('users');
    let usersArray = storedUsers ? JSON.parse(storedUsers) : [];

    // Reset values before counting
    this.categories.forEach(category => category.value = 0);

    // Count users in each category
    usersArray.forEach((user: any) => {
      if (user.type === 'hr') {
        this.categories[0].value++;
      } else if (user.type === 'developer') {
        this.categories[1].value++;
      } else if (user.type === 'tester') {
        this.categories[2].value++;
      }
    });
  }

}
