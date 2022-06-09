import { createWebHistory, createRouter } from 'vue-router';
import TicTacToe from '@/components/TicTacToe.vue';

const routes = [
	{
		path: '/game',
		name: 'TicTacToe',
		component: TicTacToe
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;